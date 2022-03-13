import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

const refs = {
  openModalRegisteBtn: document.querySelector('[data-register]'),
  closeModalBtn: document.querySelector('[data-modal-register-close]'),
  backdrop: document.querySelector('[data-modal-register]'),
};

const loginRegisterBtn = document.querySelector('#login');
const logoutBtn = document.querySelector('.js-logout-button');

const myStorage = window.localStorage;

let token = myStorage.getItem('Bearer');
let id = myStorage.getItem('id');
let sid = myStorage.getItem('sid');
let refreshToken = myStorage.getItem('refreshToken');
// console.log(refreshToken);
// console.log(id);
// console.log(sid);

if (token) {
  loginRegisterBtn.innerHTML = '';
  document.querySelector('.menu-auth').classList.add('is-hidden');
  document.querySelector('.auth').classList.add('is-hidden');
  document.getElementById('exit.btn').classList.remove('is-hidden');
  document.getElementById('menu-exit.btn').classList.remove('is-hidden');
} else if (!token) {
  document.getElementById('menu-exit.btn').classList.add('is-hidden');
  document.getElementById('exit.btn').classList.add('is-hidden');
  document.querySelector('.auth').classList.remove('is-hidden');
  document.querySelector('.menu-auth').classList.remove('is-hidden');
}

refs.openModalRegisteBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

logoutBtn.addEventListener('click', onLogout);

function toggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
}

const formInputEmail = document.querySelector('#e-mail');
const formInputPassword = document.querySelector('#password');
const formRegistration = document.querySelector('[data-register-form]');
const loginFormBtn = document.querySelector('#login');
const registerFormBtn = document.querySelector('#registerBtn');

let registerFormQuery = {};
let isOnRegisterFormBtnClick;
let isLoginFormBtn;

formRegistration.addEventListener('submit', onRegisterFormSubmit);

registerFormBtn.addEventListener('click', onRegisterFormBtnClick);

loginFormBtn.addEventListener('click', onLoginFormBtnClick);

function onRegisterFormBtnClick(event) {
  isOnRegisterFormBtnClick = event.target.classList.contains('register-form-button');
}
function onLoginFormBtnClick(event) {
  isLoginFormBtn = event.target.classList.contains('login-form-button');
}

function onRegisterFormSubmit(event) {
  event.preventDefault();

  let Token;

  registerFormQuery.email = formInputEmail.value;
  registerFormQuery.password = formInputPassword.value;

  if (isLoginFormBtn) {
    isLoginFormBtn = false;

    toLogin(registerFormQuery).then(data => {
      const message = data.message;
      console.log(data);

      if (message) {
        return error({
          text: message,
          type: 'info',
          animateSpeed: 'normal',
          delay: 2000,
        });
      }
      Token = data.accessToken;
      sid = data.sid;
      refreshToken = data.refreshToken;

      if (Token !== undefined) {
        localStorage.setItem('Bearer', Token);

        if (id) {
          localStorage.setItem('id', id);
        }
        if (sid) {
          localStorage.setItem('sid', sid);
        }
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }

        location.reload();
      }
    });
  }

  if (isOnRegisterFormBtnClick) {
    isOnRegisterFormBtnClick = false;

    if (Token === undefined) {
      toRegistation(registerFormQuery).then(data => {
        const id = data.id;
        const message = data.message;

        // console.log(data);
        // console.log(id);

        // console.log(data.message);
        if (message) {
          return error({
            text: message,
            type: 'info',
            animateSpeed: 'normal',
            delay: 4000,
          });
        }

        // localStorage.setItem('id', id);

        // console.log(Token);
        if (id !== undefined) {
          error({
            text: 'РЕГИСТРАЦИЯ УСПЕШНА! ТЕПЕРЬ НАЖМИ НА КНОПКУ "УВiЙТИ"',
            type: 'info',
            animateSpeed: 'normal',
            delay: 5000,
          });
          if (id) {
            localStorage.setItem('id', id);
          }
        }
      });
    }
  }

  // toLogin(registerFormQuery)
  // .then(data => {
  // console.log(data.accessToken);

  // const message = data.message;
  // console.log(data.message);
  // if (message) {
  //   return error({
  //     text: message,
  //     type: 'info',
  //     animateSpeed: 'normal',
  //     delay: 2000,
  //   });
  // }

  // Token = data.accessToken;

  // if (isOnRegisterFormBtnClick) {
  //   console.log('click po reg');
  //   if (Token !== undefined) {
  //     localStorage.setItem('Bearer', Token);
  //     location.reload();
  //   }
  //   else if (Token === undefined) {
  //     toRegistation(registerFormQuery).then(data => {
  //       // console.log(data.accessToken);
  //       const Token = data.accessToken;

  //       if (Token !== undefined) {
  //         localStorage.setItem('Bearer', Token);
  //         location.reload();
  //       }
  //     });
  //   }
  // }
  // })
  // .catch(error => {
  // console.log(error);s
  // });
}

const toLogin = function (param) {
  async function postData(url = 'https://callboard-backend.herokuapp.com/auth/login', data = param, method = 'POST') {
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // Authorization:
        //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQzMzYxZjgwZGFiZDAwMTc5ZDdmZjYiLCJzaWQiOiI1ZmQzMzY0MjgwZGFiZDAwMTc5ZDdmZjkiLCJpYXQiOjE2MDc2Nzc1MDYsImV4cCI6MTYwNzY4MTEwNn0.RnvvG68q1yWWaIVr777cLMJg-eNwugnc7x5ldqFuoNM',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    return await response.json();

    // parses JSON response into native JavaScript objects
  }
  return postData();
};
const toRegistation = function (param) {
  async function postData(
    url = 'https://callboard-backend.herokuapp.com/auth/register',
    data = param,
    method = 'POST',
  ) {
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // Authorization:
        //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQzMzYxZjgwZGFiZDAwMTc5ZDdmZjYiLCJzaWQiOiI1ZmQzMzY0MjgwZGFiZDAwMTc5ZDdmZjkiLCJpYXQiOjE2MDc2Nzc1MDYsImV4cCI6MTYwNzY4MTEwNn0.RnvvG68q1yWWaIVr777cLMJg-eNwugnc7x5ldqFuoNM',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    return await response.json();

    // parses JSON response into native JavaScript objects
  }
  return postData();
};

function onLogout() {
  myStorage.removeItem('Bearer');
  myStorage.removeItem('id');
  myStorage.removeItem('sid');
  myStorage.removeItem('refreshToken');
  async function postData(
    url = 'https://callboard-backend.herokuapp.com/auth/logout',
    // data = param,
    method = 'POST',
  ) {
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // Authorization:
        //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQzMzYxZjgwZGFiZDAwMTc5ZDdmZjYiLCJzaWQiOiI1ZmQzMzY0MjgwZGFiZDAwMTc5ZDdmZjkiLCJpYXQiOjE2MDc2Nzc1MDYsImV4cCI6MTYwNzY4MTEwNn0.RnvvG68q1yWWaIVr777cLMJg-eNwugnc7x5ldqFuoNM',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    return await response.json();
  }
  postData();

  location.reload();
}
