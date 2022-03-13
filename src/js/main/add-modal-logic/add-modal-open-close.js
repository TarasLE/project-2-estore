import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

const refs = {
  openModalBillBtn: document.querySelector('[data-add-bill]'),
  closeModalBtn: document.querySelector('[data-modal-add-bill-close]'),
  backdrop: document.querySelector('[data-modal-add-bill]'),
};

refs.openModalBillBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.backdrop.addEventListener('click', onBackDropClick);
// refs.openModalLoginBtn.addEventListener('click', toggleModal);
const Token = localStorage.getItem('Bearer');

function toggleModal() {
  if (!Token) {
    error({
      text: 'Авторизируйтесь!',
      type: 'info',
      animateSpeed: 'normal',
      delay: 500,
    });
    return;
  }
  refs.backdrop.classList.toggle('is-hidden');
}
function onBackDropClick(event) {
  const isonBackDropClick = event.target.classList.contains('js-backdrop');

  // console.log(isonBackDropClick);
  if (!isonBackDropClick) {
    return;
  }
  refs.backdrop.classList.toggle('is-hidden');
}
