const deleteAddBtn = document.querySelector('.js-delete-add');

deleteAddBtn.addEventListener('click', onDeleteBtnClick);

const myStorage = window.localStorage;

let token = myStorage.getItem('Bearer');
let id = myStorage.getItem('id');
let sid = myStorage.getItem('sid');
// console.log(sid);
// console.log(token);
// console.log(id);

async function onDeleteBtnClick() {
  const cardId = document
    .querySelector('.js-product-card')
    .getAttribute('data-id');
  //   console.log(cardId);

  let config = {
    method: 'DELETE',
    url: `https://callboard-backend.herokuapp.com/call/${cardId}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
