const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.backdrop.addEventListener('click', onBackDropClick);

function toggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
}

function onBackDropClick(event) {
  const isonBackDropClick = event.target.classList.contains('js-backdrop');

  if (!isonBackDropClick) {
    return;
  }
  refs.backdrop.classList.toggle('is-hidden');
}
