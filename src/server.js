
import express from 'express';
import logger from 'morgan';
import { User } from './user.js';
import { TotalsDatabase, UserDatabase } from './db.js';

import { readFile, writeFile } from 'fs/promises';

// const JSONfile = 'src/database.json';
const url = "mongodb+srv://teamninteen:oiVMOYGDgB7kVGEO@cluster0.zby95.mongodb.net/scribblegram?retryWrites=true&w=majority"
let tdb = new TotalsDatabase(url);
await tdb.connect();
let udb = new UserDatabase(url);
await udb.connect();
// let totals = await reload(JSONfile);

// async function reload(filename) {
//   try {
//     const data = await readFile(filename, { encoding: 'utf8' });
//     let d = JSON.parse(data);
//     return d;
//   } catch (err) {
//     let d = { totalCreatedUsers: 0,
//               totalCreatedImages: 0,
//             };
//     return d;
//   }
// }

// async function saveDatabase() {
//   try {
//     const data = JSON.stringify(totals);
//     await writeFile(JSONfile, data, { encoding: 'utf8' });
//   } catch (err) {
//     console.log(err);
//   }
// }

/* USER FUNCTIONS */
async function createUser(response, name, password) {
  if (name === undefined || password === undefined) {
    // 400 - Bad Request
    response.status(400).json({status: 'failed', error: 'Valid username and password is required'});
  } else {
    try {
      let tusers = await tdb.getTotalUsers();
      await tdb.setTotalUsers(tusers+1);
      await udb.createUser(new User(tusers, name, password));
      response.status(200).json({status: "success"});
    } catch(err) {
      response.status(400).json({status: 'failed', error: 'user not created'});
    }
  }
}

async function readUser(response, id) {
  //await reload(JSONfile);
  const u = await udb.readUser(id);
  if (u !== -1) {
    response.json({status: "success", user: u});
  } else {
    // 404 - Not Found
    response.json({status: 'failed', error: `User '${id}' Not Found`});
  }
}

async function loginUser(response, name, password) {
  //await reload(JSONfile);
  const u = await udb.loginUser(name, password);
  if (u !== -1) {
    response.json({status: "success", user: u});
  } else {
    // 404 - Not Found
    response.json({status: 'failed', error: `User '${name}' Not Found`});
  }
}

async function updateUser(response, id, name, password) {
  const u = await udb.updateUser(id, name, password);
  if (u !== -1) {
    response.status(200).json({status: "success"});
    //await saveDatabase();
  } else {
    // 404 - Not Found
    response.json({status: 'failed', error: `User '${id}' Not Found`});
  }
}

async function deleteUser(response, id) {
  const u = await udb.deleteUser(id);
  if (u !== -1) {
    response.status(200).json({status: "success"});
    //await saveDatabase();
  } else {
    // 404 - Not Found
    response.json({status: 'failed', error: `User '${name}' Not Found`});
  }
}

/* IMAGE FUNCTIONS */
async function createImage(response, name, image) {
  if (name === undefined || image === undefined) {
    // 400 - Bad Request
    response.status(400).json({status: 'failed', error: 'Valid username and image is required'});
  } else {
    //await reload(JSONfile);
    udb.totalCreatedImages += 1;
    let u = getUser(name);
    udb.images.push(u.createImage(udb.totalCreatedImages, image));
    //await saveDatabase();
    response.status(200).json({status: "success"});
  }
}

async function readImage(response, id) {
  //await reload(JSONfile);
  const i = getImage(id);
  if (i !== -1) {
    response.json({status: "success", image: i});
  } else {
    // 404 - Not Found
    response.json({status: 'failed', error: "Image not found"});
  }
}

async function updateImage(response, id) {
  const i = getImage(id);
  if (i !== -1) {
    // i.id = id;
    response.status(200).json({status: "success", image: i});
    //await saveDatabase();
  } else {
    // 404 - Not Found
    response.json({status: 'failed', error: "Image not found"});
  }
}

async function deleteImage(response, id) {
  const i = getImage(id);
  if (i !== -1) {
    udb.images.splice(udb.images.indexOf(i), 1);
    response.status(200).json({status: "success"});
    //await saveDatabase();
  } else {
    // 404 - Not Found
    response.json({status: 'failed', error: "Image not found"});
  }
}

async function dumpDatabase(response) {
  //await reload(JSONfile);
  response.json(udb);
}

const app = express();
const port = process.env.PORT || 8000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('src/client'));

/* USER REQUESTS */
app.post('/user/create', async (request, response) => {
  const options = request.body;
  createUser(response, options.name, options.password);
});

app.get('/user/read', async (request, response) => {
  const options = request.body;
  readUser(response, options.id);
});

app.post('/user/login', async (request, response) => {
  const options = request.body;
  loginUser(response, options.name, options.password);
});

app.put('/user/update', async (request, response) => {
  const options = request.body;
  updateUser(response, options.id, options.name, options.password);
});

app.delete('/user/delete', async (request, response) => {
  const options = request.body;
  deleteUser(response, options.name);
});

/* IMAGE REQUESTS */
app.post('/image/create', async (request, response) => {
  const options = request.body;
  createImage(response, options.name, options.image);
});

app.get('/image/read', async (request, response) => {
  const options = request.body;
  readImage(response, options.id);
});

app.put('/image/update', async (request, response) => {
  const options = request.body;
  updateImage(response, options.id);
});

app.delete('/image/delete', async (request, response) => {
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