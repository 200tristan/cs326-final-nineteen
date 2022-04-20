import * as crud from './crud.js';


const ls = window.localStorage;

const pageSetup = () => {
    const buttonCol = document.getElementById('button-col');
    const username = ls.getItem('user');

    if (username === null) {
        const loginButton = document.createElement('a');
        loginButton.setAttribute('href', 'login.html');
        loginButton.setAttribute('role', 'button');
        loginButton.setAttribute('id', 'login-btn');
        loginButton.innerHTML = 'Login';
        loginButton.classList.add('btn');
        loginButton.classList.add('btn-primary');
        buttonCol.appendChild(loginButton);
    } else {
        //NOTE: usernames always currently save as undefined, is database working?
        //const headerText = document.getElementById('header-text');
        //headerText.innerHTML = username + "\'s ScribblGram";
        const createButton = document.createElement('a');
        createButton.setAttribute('href', 'scribblStudio.html');
        createButton.setAttribute('role', 'button');
        createButton.setAttribute('id', 'create-btn');
        createButton.innerHTML = 'Create!';
        createButton.classList.add('btn');
        createButton.classList.add('btn-primary');
        buttonCol.appendChild(createButton);

        const logoutButton = document.createElement('a');
        logoutButton.setAttribute('href', 'index.html');
        logoutButton.setAttribute('role', 'button');
        logoutButton.setAttribute('id', 'logout-btn');
        logoutButton.innerHTML = 'Logout';
        logoutButton.classList.add('btn');
        logoutButton.classList.add('btn-secondary');
        logoutButton.addEventListener('click', () => {
            ls.removeItem('user');
        });
        buttonCol.appendChild(logoutButton);
    }
}

pageSetup();

// programatically generate image grid from database here