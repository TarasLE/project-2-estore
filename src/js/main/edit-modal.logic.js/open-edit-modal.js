const refs = {
  closeModalBtn: document.querySelector('[data-modal-add-edit-close]'),
  backdrop: document.querySelector('[data-modal-edit-bill]'),
  modalFavorites: document.querySelector('.modal-favorites'),
  myCard: document.querySelector('.my-goods-hbs'),
};
const imageList = document.querySelector('.image-preview__edit');

// console.log(refs.openModalEditBtn);
// console.log(refs.closeModalBtn);
// console.log(imageList);
// console.log(refs.modalFavorites);
// console.log(refs.myCard);

refs.myCard.addEventListener('click', openEditModal);

refs.closeModalBtn.addEventListener('click', closeEditAddForm);

function closeEditAddForm() {
  // const imageList = document.querySelector('.image-preview__item');
  // console.dir(imageList.children[2]);
  // imageList.children[2].innerHTML = '';
  refs.backdrop.classList.add('is-hidden');
}

function openEditModal(e) {
  if (e.target.id === 'openEditModal') {
    refs.backdrop.classList.remove('is-hidden');
  }
  let cardAtrubutes = {};

  const openModalEditBtn = document.querySelector('.js-create-button');

  const addBillFormEl = document.querySelector('.js-edit-form');

  const imgAtributes = getAtributs(cardAtrubutes, e);

  setValuesToFormEdit(imgAtributes);
}
function getAtributs(atrubutes, event) {
  // const isonBackDropClick = event.target.classList.contains('js-product-card');
  // console.log(isonBackDropClick);
  // if (isonBackDropClick) {
  atrubutes.title = document.querySelector('.js-product-card').getAttribute('data-title');

  atrubutes.description = document.querySelector('.js-product-card').getAttribute('data-description');

  atrubutes.phone = document.querySelector('.js-product-card').getAttribute('data-phone');

  atrubutes.category = document.querySelector('.js-product-card').getAttribute('data-category');

  atrubutes.id = document.querySelector('.js-product-card').getAttribute('data-id');
  atrubutes.price = document.querySelector('.js-product-card').getAttribute('data-price');
  // }

  return atrubutes;
}

function setValuesToFormEdit(imgAtributes) {
  document.querySelector('#nameEdit').value = imgAtributes.title;
  document.querySelector('#form-descriptionEdit').value = imgAtributes.description;
  document.querySelector('#priceEdit').value = imgAtributes.price;
  document.querySelector('#telefonEdit').value = imgAtributes.phone;
  console.log('inputValue', imgAtributes.title);
}

// const isMyCadrLoaded = refs.myCard;
//  function getAtribut(e) {
//   if (!e.target.nodeName === 'IMG') {
//     return;
//   }
//   // const dataAtribut = document
//   //   .querySelector('.product-card')
//   //   .getAttribute('data-cart');
//   // return dataAtribut;
//  }

// if (isMyCadrLoaded) {
//   refs.myCard.addEventListener('click', getAtribut);
//   refs.openModalEditBtn.addEventListener('click', toggleModal);

//   console.log(3424323);

//   function getAtribut(e) {
//     // if (!e.target.nodeName === 'IMG') {
//     //   return;
//     // }

//     console.log(33333);
//   }
// }

// const dataAtribut = document
//   .querySelector('.product-card')
//   .getAttribute('data-cart');
// return dataAtribut;
// }

// refs.modalFavorites.addEventListener('DOMContentLoaded', function () {
//   console.log(refs.modalFavorites);
//   refs.openModalBillBtn.addEventListener('click', toggleModal);
//   refs.closeModalBtn.addEventListener('click', toggleModal);

//   console.log(231312);
//   // refs.openModalLoginBtn.addEventListener('click', toggleModal);

// function toggleModal() {
//   refs.backdrop.classList.toggle('is-hidden');
// }
// });

// refs.openModalBillBtn.addEventListener('click', toggleModal);
// refs.closeModalBtn.addEventListener('click', toggleModal);
// // refs.openModalLoginBtn.addEventListener('click', toggleModal);

// function toggleModal() {
//   refs.backdrop.classList.toggle('is-hidden');
// }

// refs.myCard = document.querySelector('.my-goods-hbs');

// myCard.addEventListener('click', getAtribut);

// function getAtribut(e) {
//   if (!e.target.nodeName === 'IMG') {
//     return;
//   }
//   const dataAtribut = document
//     .querySelector('.product-card')
//     .getAttribute('data-cart');
//   return dataAtribut;
// }
