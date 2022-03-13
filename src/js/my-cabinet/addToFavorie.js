document.addEventListener('click', weitForLoeded);

function weitForLoeded(event) {
  if (event.target.classList.contains('js-add-to-favorite')) {
    let atrubutes = {};

    atrubutes.id = document.querySelector('.js-add-to-favorite').getAttribute('data-id');
    const cardId = atrubutes.id;
    console.log(cardId);

    addToFavorites(cardId);

    // ('https://callboard-backend.herokuapp.com/call/favourite/5fde2aa364501b0017308d4c');
  }
}

async function addToFavorites(cardId) {
  const Token = localStorage.getItem('Bearer');

  let config = {
    method: 'POST',
    url: `https://callboard-backend.herokuapp.com/call/favourite/${cardId}`,
    headers: {
      accept: 'application/json',
      //   'Content-Type': 'application/json',
      Authorization: `Bearer ${Token}`,
      //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQ3Y2VhZWMyOThhMjAwMTc5YzhjYzAiLCJzaWQiOiI1ZmQ5MmMyMmNjZWZlZTAwMTc1M2ZiNzIiLCJpYXQiOjE2MDgwNjgxMzAsImV4cCI6MTYwODA3MTczMH0.I20tV29tq6tHg_XIPcDt1JW21Xmy3Un_kn64p6rMk_w',
    },
    // data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
