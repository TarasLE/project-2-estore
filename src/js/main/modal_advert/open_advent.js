import advendModalTmpl from '../../../templates/adverdMurkup.hbs';

import openAdvertTpml from '../../../templates/modal_advend.hbs';

const advertContainer = document.querySelector('.card-modal-body');

const backDrop = document.querySelector('[data-advent-open]');

document.addEventListener('click', openAdvendModal);

function openAdvendModal(event) {
  let cardAtrubutes = {};

  if (event.target.classList.contains('js-fullScreen')) {
    backDrop.classList.remove('is-hidden');

    renderAdvertStartMarkup();

    const imgAtributes = getAtributs(cardAtrubutes);

    const closeAdventBtn = document.querySelector('.card-modal__close-btn');

    closeAdventBtn.addEventListener('click', closeAdventModal);
    backDrop.addEventListener('click', onBackDropClick);
  }
}

function closeAdventModal(e) {
  backDrop.classList.add('is-hidden');
}
function onBackDropClick(e) {
  if (e.target.classList.contains('card-modal-body')) {
    backDrop.classList.add('is-hidden');
  }
}

function renderAdvertStartMarkup() {
  advertContainer.innerHTML = openAdvertTpml();
}

function getAtributs(atrubutes) {
  // const isonBackDropClick = event.target.classList.contains('js-product-card');

  //   console.log(isonBackDropClick);
  atrubutes.imageUrls = [];

  atrubutes.title = document.querySelector('.js-fullScreen').getAttribute('data-title');

  atrubutes.description = document.querySelector('.js-fullScreen').getAttribute('data-description');

  atrubutes.phone = document.querySelector('.js-fullScreen').getAttribute('data-phone');

  atrubutes.category = document.querySelector('.js-fullScreen').getAttribute('data-category');

  atrubutes.id = document.querySelector('.js-fullScreen').getAttribute('data-id');
  atrubutes.price = document.querySelector('.js-fullScreen').getAttribute('data-price');
  atrubutes.imageUrls = document.querySelector('.js-fullScreen').getAttribute('data-images');

  console.log(atrubutes.imageUrls);

  renderMarkupAdvert(atrubutes);

  return atrubutes;
}

function renderMarkupAdvert(atrubutes) {
  advertContainer.innerHTML = advendModalTmpl(atrubutes);
}
