import * as crud from './crud.js';

const username = document.getElementById('typeEmailX-2');
const password = document.getElementById('typePasswordX-2');
const login = document.getElementById('login');
const register = document.getElementById('register');

const ls = window.localStorage;
const lsSet = (k, v) => ls.setItem(k, v);
const lsGet = (k) => ls.getItem(k);
const lsRm = (k) => ls.removeItem(k);

login.addEventListener("click", async () => {
    const u = await crud.loginUser(username.value, password.value);
    if(u.user.name !== undefined) {
        lsSet("user", u.user.name);
        console.log("login successful");
        window.location.href = "index.html";
    }
    else{
        console.log(u.error);
    }
});

register.addEventListener("click", async () => {
    const u = await crud.createUser(username.value, password.value);
    if(u.user.name === 'success') {
        lsSet("user", u.user.name);
        console.log("created user successfully");
        window.location.href = "index.html";
    }
    else {
        console.log(u.error);
    }
});