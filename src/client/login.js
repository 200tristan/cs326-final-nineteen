import * as crud from './crud.js';

const username = document.getElementById('typeEmailX-2');
const password = document.getElementById('typePasswordX-2');
const login = document.getElementById('login');
const register = document.getElementById('register');

const ls = window.localStorage;
const lsSet = (k, v) => ls.setItem(k, v);
const lsGet = (k) => ls.getItem(k);
const lsRm = (k) => ls.removeItem(k);

login.addEventListener("click", () => {
    const user = crud.loginUser(username.value, password.value);
    lsSet("user", user.name);
    console.log("login successful");
    window.location.href = "index.html";
});

register.addEventListener("click", () => {
    const user = crud.createUser(username.value, password.value);
    lsSet("user", user.name);
    console.log("created user");
    window.location.href = "index.html";
});