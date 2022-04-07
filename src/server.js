import express from 'express';
import logger from 'morgan';
import User from 'constantObjects.js';
import { readFile, writeFile } from 'fs/promises';

let database = {users: {},
              images: {}};

const JSONfile = 'database.json';

async function reload(filename) {
  try {
    const data = await readFile(filename, { encoding: 'utf8' });
    database = JSON.parse(data);
  } catch (err) {
    database = {users: {},
              images: {}};
  }
}

async function saveDatabase() {
  try {
    const data = JSON.stringify(database);
    await writeFile(JSONfile, data, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
}

function userExists(name) {
  return name in database;
}

async function createUser(response, name, password) {
  if (name === undefined) {
    // 400 - Bad Request
    response.status(400).json({ error: 'Valid username and password is required' });
  } else {
    await reload(JSONfile);
    database.users[name] = new User(name, password);
    await saveDatabase();
    response.json({ name, value: 0 });
  }
}

async function readUser(response, name) {
  await reload(JSONfile);
  if (userExists(name)) {
    response.json({ name: name, value: database[name] });
  } else {
    // 404 - Not Found
    response.json({ error: `Counter '${name}' Not Found` });
  }
}

async function updateUser(response, name) {
  if (userExists(name)) {
    database[name] += 1;
    response.json({ name: name, value: database[name] });
    await saveDatabase();
  } else {
    // 404 - Not Found
    response.json({ error: `Counter '${name}' Not Found` });
  }
}

async function deleteUser(response, name) {
  if (userExists(name)) {
    delete database[name];
    response.json({ name: name, value: database[name] });
    await saveDatabase();
  } else {
    // 404 - Not Found
    response.json({ error: `Counter '${name}' Not Found` });
  }
}

async function dumpDatabase(response) {
  await reload(JSONfile);
  response.json(database);
}

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));

app.post('user/create', async (request, response) => {
  const options = request.body;
  createUser(response, options.name);
});

app.get('user/read', async (request, response) => {
  const options = request.query;
  readUser(response, options.name);
});

app.put('user/update', async (request, response) => {
  const options = request.body;
  updateUser(response, options.name);
});

app.delete('user/delete', async (request, response) => {
  const options = request.body;
  deleteUser(response, options.name);
});

app.get('/dump', async (request, response) => {
  const options = request.body;
  dumpDatabase(response);
});

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
