// const catigorie = [
//   'property',
//   'transport',
//   'work',
//   'electronics',
//   'business and services',
//   'recreation and sport',
//   'free',
//   'trade',
// ];
import catigoriesTmpl from '../../templates/catigories.hbs';
import CardsInitialTpl from '../../templates/card-initial.hbs';
import { clearCategoryContainer, refMainContainer } from '../header/render-categories-taras';
import { optionalContainerMain } from '../refs/variables-refs';

// console.log(refMainContainer);
// console.log(optionalContainerMain);

const categoriesListContainer = document.querySelector('.js-categories-list');
const catogoriesContainer = document.querySelector('.js-catigories');

// const searchResoultContainer = document.querySelector('.search-resoult');
// const searchModal = document.querySelector('[data-modal]');
// console.log(categoriesListContainer);
let catigoriesQuery;

categoriesListContainer.addEventListener('click', onCategoriesItem);

export const renderOtionalCont = () => {
  refMainContainer.innerHTML = optionalContainerMain;
};

export const changeTplSet = () => {
  var refCardOptCont = document.querySelectorAll('.optContUl .swiper-slide');
  refCardOptCont.forEach(el => {
    var refCardForOtp = document.querySelector('.optContUl .swiper-slide');
    refCardForOtp.classList.remove('swiper-slide');
    refCardForOtp.classList.add('optCategCard');
  });
};

function onCategoriesItem(event) {
  event.preventDefault();

  // const currentCategory = event.target.id;

  catigoriesQuery = event.target.id;

  // console.log(catigoriesQuery);
  const url = `https://callboard-backend.herokuapp.com/call/specific/${catigoriesQuery}`;
  toCatigoriesClick(url).then(data => {
    // console.log(clearCategoryContainer);
    clearCategoryContainer();
    renderOtionalCont();
    const refOptUlContainer = document.querySelector('.optContUl');
    // const refOptContainer = document.querySelector('optCont');
    // refOptContainer.classList.remove('')

    // catogoriesContainer.innerHTML = catigoriesTmpl(data);
    refOptUlContainer.insertAdjacentHTML('beforeend', CardsInitialTpl(data));

    changeTplSet();

    // console.log(data);
    // toggleModal();
  });
}

const toCatigoriesClick = function (param) {
  document.getElementById('myCabinetDiv').hidden = true;
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

// function toggleModal() {
// searchModal.classList.toggle('is-hidden');
// }
