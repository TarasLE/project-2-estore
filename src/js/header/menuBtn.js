const menuBtnOpenModalMobile = document.querySelector('.js-menu-btn-mobile');
const menuBtnOpenModalTablet = document.querySelector('.js-menu-btn-tablet');
const menuBackdrop = document.getElementById('menu-backdrop');
const menuCloseBtn = document.querySelector('.js-menu-close-btn');
const btnShowLinksMenu = document.querySelector('[data-show-links]');
const menuHiddenFavorites = document.querySelector(
  '.menu-hidden-ads-favorites',
);
const hiddenFavorites = document.querySelector('.hidden-ads-favorites');

const btnShowLinksHeader = document.querySelector('.js-my-cabinet-btn');

menuBtnOpenModalMobile.addEventListener('click', onOpenMenuModal);
menuBtnOpenModalTablet.addEventListener('click', onOpenMenuModal);
menuCloseBtn.addEventListener('click', onOpenMenuModal);
btnShowLinksMenu.addEventListener('click', onShowMenuAdsFavourites);
btnShowLinksHeader.addEventListener('click', onShowAdsFavourites);

function onOpenMenuModal() {
  menuBackdrop.classList.toggle('is-hidden');
}

function onShowMenuAdsFavourites() {
  menuHiddenFavorites.classList.toggle('is-hidden');
}

function onShowAdsFavourites() {
  hiddenFavorites.classList.toggle('is-hidden');
}
