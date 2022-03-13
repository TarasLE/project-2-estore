const refs = {
  openModalBtn: document.querySelector('[data-exit]'),
  closeModalBtn: document.querySelector('[data-modal-logout-close]'),
  backdrop: document.querySelector('[data-modal-logout]'),
  cancelLogoutBtn: document.querySelector('[data-cancel]'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.cancelLogoutBtn.addEventListener('click', toggleModal);

refs.backdrop.addEventListener('click', onBackDropClick);

function toggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
}

function onBackDropClick(event) {
  const isonBackDropClick = event.target.classList.contains(
    'js-backdrop-logout',
  );
  // console.log(isonBackDropClick);

  if (!isonBackDropClick) {
    return;
  }
  refs.backdrop.classList.toggle('is-hidden');
}
