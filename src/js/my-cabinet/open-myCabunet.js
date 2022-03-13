import refs from './refs';
import myGoodsTmpl from '../../templates/card-my-goods.hbs';
import FavoritesTmpl from '../../templates/card-favorites.hbs';
import { clearCategoryContainer } from '../header/render-categories-taras';

const { openMyCabinetBtn, goodsContainer, favoritesContainer } = refs;

openMyCabinetBtn.addEventListener('click', fetchMyCabinet);

const token = localStorage.getItem('Bearer');

document.getElementById('myCabinetDiv').hidden = true;

async function fetchMyCabinet() {
  clearCategoryContainer();
  document.getElementById('myCabinetDiv').hidden = false;

  let config = {
    method: 'GET',
    url: 'https://callboard-backend.herokuapp.com/call/own',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQ3Y2VhZWMyOThhMjAwMTc5YzhjYzAiLCJzaWQiOiI1ZmQ5MmMyMmNjZWZlZTAwMTc1M2ZiNzIiLCJpYXQiOjE2MDgwNjgxMzAsImV4cCI6MTYwODA3MTczMH0.I20tV29tq6tHg_XIPcDt1JW21Xmy3Un_kn64p6rMk_w',
    },
    // data: formData,
  };

  await axios(config)
    .then(function (response) {
      console.log(response);
      const myGoods = response.data.favourites;

      goodsContainer.innerHTML = myGoodsTmpl(myGoods);
    })
    .catch(function (error) {
      console.log(error);
    });

  config = {
    method: 'GET',
    url: 'https://callboard-backend.herokuapp.com/call/favourites',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQ3Y2VhZWMyOThhMjAwMTc5YzhjYzAiLCJzaWQiOiI1ZmQ5MmMyMmNjZWZlZTAwMTc1M2ZiNzIiLCJpYXQiOjE2MDgwNjgxMzAsImV4cCI6MTYwODA3MTczMH0.I20tV29tq6tHg_XIPcDt1JW21Xmy3Un_kn64p6rMk_w',
    },
    // data: formData,
  };

  await axios(config)
    .then(function (response) {
      // console.log(response);
      const myGoods = response.data;

      favoritesContainer.innerHTML = FavoritesTmpl(myGoods);
    })
    .catch(function (error) {
      console.log(error);
    });
}
