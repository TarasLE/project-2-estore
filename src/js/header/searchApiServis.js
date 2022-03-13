import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

import searchResoultTmpl from '../../templates/card-initial.hbs';

const searchFormEl = document.querySelector('.js-search-modal-form');
const searchInputEl = document.querySelector('#searchInput');
const searchResoultContainer = document.querySelector('.catigories-container');
const searchModal = document.querySelector('[data-modal]');

let searchQuery = {};

searchFormEl.addEventListener('submit', onSearchFormInput);

function onSearchFormInput(event) {
  event.preventDefault();

  searchQuery = searchInputEl.value;

  // console.log(searchQuery);
  const url = `https://callboard-backend.herokuapp.com/call/find?search=${searchQuery}`;
  toSearch(url).then(data => {
    const message = data.message;

    if (message) {
      return error({
        text: message,
        type: 'info',
        animateSpeed: 'normal',
        delay: 2000,
      });
    }
    if (data.length === 0) {
      return error({
        text: 'search" is not allowed to be empty',
        type: 'info',
        animateSpeed: 'normal',
        delay: 2000,
      });
    }
    searchResoultContainer.innerHTML = searchResoultTmpl(data);

    toggleModal();
  });
}

const toSearch = function (param) {
  async function postData(url = param, method = 'GET') {
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // Authorization:
        //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQzMzYxZjgwZGFiZDAwMTc5ZDdmZjYiLCJzaWQiOiI1ZmQzMzY0MjgwZGFiZDAwMTc5ZDdmZjkiLCJpYXQiOjE2MDc2Nzc1MDYsImV4cCI6MTYwNzY4MTEwNn0.RnvvG68q1yWWaIVr777cLMJg-eNwugnc7x5ldqFuoNM',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      //   body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    return await response.json();

    // parses JSON response into native JavaScript objects
  }
  return postData();
};

function toggleModal() {
  searchModal.classList.toggle('is-hidden');
}
