const loginButton = document.getElementById('login-btn');
const createButton = document.getElementById('create-btn');
const ls = window.localStorage;

const generateButtons = () => {
    const buttonCol = document.getElementById('button-col');
    if (ls.getItem('user') === null) {
        const loginButton = document.createElement('a');
        loginButton.setAttribute('href', 'login.html');
        loginButton.setAttribute('role', 'button');
        loginButton.innerHTML = 'Login';
        loginButton.classList.add('btn btn-primary');
        buttonCol.appendChild(loginButton);
    } else {
        const createButton = document.createElement('a');
        createButton.setAttribute('href', 'scribblStudio.html');
        createButton.setAttribute('role', 'button');
        createButton.innerHTML = 'Create!';
        createButton.classList.add('btn');
        createButton.classList.add('btn-primary');
        buttonCol.appendChild(createButton);

        const logoutButton = document.createElement('a');
        logoutButton.setAttribute('href', 'index.html');
        logoutButton.setAttribute('role', 'button');
        logoutButton.innerHTML = 'Logout';
        logoutButton.classList.add('btn');
        logoutButton.classList.add('btn-secondary');
        buttonCol.appendChild(logoutButton);
    }
}

generateButtons();

// programatically generate image grid from database here