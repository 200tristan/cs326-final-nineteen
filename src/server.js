import express from 'express';
import logger from 'morgan';
import { User } from './user.js';

import { readFile, writeFile } from 'fs/promises';

const JSONfile = 'database.json';
let database = reload(JSONfile);

async function reload(filename) {
  try {
    const data = await readFile(filename, { encoding: 'utf8' });
    database = JSON.parse(data);
  } catch (err) {
    database = {totalCreatedUsers: 0,
                totalCreatedImages: 0,
                users: [],
                images: []};
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

//return user object if exists else returns -1 
function getUser(name) {
  for(const user of database.users) {
    if(user.name === name) {
      return user;
    }
  }
  return -1;
}

//return image object if exists else returns -1 
function getImage(id) {
  for(const image of database.images) {
    if(image.id === id) {
      return image;
    }
  }
  return -1;
}

/* USER FUNCTIONS */
async function createUser(response, name, password) {
  if (name === undefined || password === undefined) {
    // 400 - Bad Request
    response.status(400).json({error: 'Valid username and password is required'});
  } else {
    await reload(JSONfile);
    database.totalCreatedUsers += 1;
    database.users.push(new User(database.totalCreatedUsers, name, password));
    await saveDatabase();
    response.status(200).json({report: "User created"});
  }
}

async function readUser(response, name) {
  await reload(JSONfile);
  if (u = getUser(name) !== -1) {
    response.json({user: u});
  } else {
    // 404 - Not Found
    response.json({error: `User '${name}' Not Found`});
  }
}

async function updateUser(response, name) {
  if (u = getUser(name) !== -1) {
    u.name = name;
    response.status(200).json({user: u});
    await saveDatabase();
  } else {
    // 404 - Not Found
    response.json({error: `User '${name}' Not Found`});
  }
}

async function deleteUser(response, name) {
  if (u = getUser(name) !== -1) {
    database.users.splice(database.users.indexOf(u), 1);
    response.status(200).json({report: "User deleted"});
    await saveDatabase();
  } else {
    // 404 - Not Found
    response.json({error: `User '${name}' Not Found`});
  }
}

/* IMAGE FUNCTIONS */
async function createImage(response, name, image) {
  if (name === undefined || image === undefined) {
    // 400 - Bad Request
    response.status(400).json({error: 'Valid username and image is required'});
  } else {
    await reload(JSONfile);
    database.totalCreatedImages += 1;
    let u = getUser(name);
    database.images.push(u.createImage(database.totalCreatedImages, image));
    await saveDatabase();
    response.status(200).json({report: "Image created"});
  }
}

async function readImage(response, id) {
  await reload(JSONfile);
  if (i = getImage(id) !== -1) {
    response.json({image: i});
  } else {
    // 404 - Not Found
    response.json({error: "Image not found"});
  }
}

async function updateImage(response, id) {
  if (i = getUser(id) !== -1) {
    // i.id = id;
    response.status(200).json({image: i});
    await saveDatabase();
  } else {
    // 404 - Not Found
    response.json({error: "Image not found"});
  }
}

async function deleteImage(response, id) {
  if (i = getImage(id) !== -1) {
    database.images.splice(database.images.indexOf(i), 1);
    response.status(200).json({report: "Image deleted"});
    await saveDatabase();
  } else {
    // 404 - Not Found
    response.json({error: "Image not found"});
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

/* USER REQUESTS */
app.post('user/create', async (request, response) => {
  const options = request.body;
  createUser(response, options.name, options.password);
});

app.get('user/read', async (request, response) => {
  const options = request.body;
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

/* IMAGE REQUESTS */
app.post('image/create', async (request, response) => {
  const options = request.body;
  createImage(response, options.name, options.image);
});

app.get('image/read', async (request, response) => {
  const options = request.body;
  readImage(response, options.id);
});

app.put('image/update', async (request, response) => {
  const options = request.body;
  updateImage(response, options.id);
});

app.delete('image/delete', async (request, response) => {
  const options = request.body;
  deleteImage(response, options.id);
});

/* MISC */
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
