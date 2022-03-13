document.addEventListener('click', function (event) {
  const btnGoodsSellersInfo = document.querySelector('.js-goodsSellersInfo');

  //   const goodsSellersInfoTitle = document.querySelector('.js-goodsSellersInfo-title');
  const underBtnInfo = document.querySelector('.js-goods-modal__button-underinfo');

  if (event.target.classList.contains('js-goodsSellersInfo')) {
    btnGoodsSellersInfo.classList.toggle('b-color-gray');

    const goodsSellersInfoTitle = document.querySelector('.js-goodsSellersInfo-title');
    // goodsSellersInfoTitle.classList.add('is-hidden');
    underBtnInfo.classList.toggle('is-hidden');
    // showGoodsSellersInfo();

    // btnGoodsSellersInfo.addEventListener('click', hideGoodsSellersInfo);
  }
});
