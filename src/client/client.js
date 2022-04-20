import * as crud from './crud.js';

const nameText = document.getElementById('name');
const ageText = document.getElementById('age');
const createButton = document.getElementById('create');
const readButton = document.getElementById('read');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');
const output = document.getElementById('output');
const all = document.getElementById('all');

createButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.createCounter(name);
  output.innerHTML = JSON.stringify(json);
  await allCounters();
});

readButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.readCounter(name);
  output.innerHTML = JSON.stringify(json);
  await allCounters();
});

updateButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.updateCounter(name);
  output.innerHTML = JSON.stringify(json);
  await allCounters();
});

deleteButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.deleteCounter(name);
  output.innerHTML = JSON.stringify(json);
  await allCounters();
});

allCounters();
