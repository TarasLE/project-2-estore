import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

const addBillFormEl = document.querySelector('.js-add-form');
const nameBillInputEl = document.querySelector('#nameBill');
const imageList = document.querySelector('.image-preview__add');
const formImage = document.querySelector('#file');
const addAboutBillInputEl = document.querySelector('#aboutBill');
const addCategoryInputEl = document.querySelector('#category');
const addPriceInputEl = document.querySelector('#price');
const addTelefonInputEl = document.querySelector('#telefon');

// let formData = {};

const myStorage = window.localStorage;

let token = myStorage.getItem('Bearer');
let id = myStorage.getItem('id');
let sid = myStorage.getItem('sid');
// console.log(sid);
// console.log(token);
// console.log(id);
const phone = document.querySelector('._phone');
// console.log(phone);

addBillFormEl.addEventListener('submit', takeFormData);

async function takeFormData(event) {
  event.preventDefault();

  let errorsForm = formValidate(addBillFormEl);

  let formData = new FormData();
  formData.append('file', formImage.files[0]);
  //   console.log(formData.get('file'));
  //   console.log(formData.get('file'));

  if (errorsForm === 0) {
    console.log('нет ошики');

    let formReq = addBillFormEl.querySelectorAll('._req');
    for (let i = 0; i < formReq.length; i += 1) {
      const element = formReq[i];

      if (element.classList.contains('_name')) {
        formData.append('title', `${element.value}`);
      } else if (element.classList.contains('_description')) {
        formData.append('description', `${element.value}`);
      } else if (element.classList.contains('_phone')) {
        formData.append('phone', `${element.value}`);
      } else if (element.classList.contains('_category')) {
        let value = element.options[element.selectedIndex].value;
        formData.append('category', `${value}`);
      } else if (element.classList.contains('_price')) {
        formData.append('price', `${element.value}`);
      }
    }
    // console.log(formData.get('file'));
    // console.log(formData.get('title'));
    // console.log(formData.get('description'));
    // console.log(formData.get('phone'));
    // console.log(formData.get('category'));
    // console.log(formData.get('price'));

    let config = {
      method: 'post',
      url: 'https://callboard-backend.herokuapp.com/call',
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQ3Y2VhZWMyOThhMjAwMTc5YzhjYzAiLCJzaWQiOiI1ZmQ5MmMyMmNjZWZlZTAwMTc1M2ZiNzIiLCJpYXQiOjE2MDgwNjgxMzAsImV4cCI6MTYwODA3MTczMH0.I20tV29tq6tHg_XIPcDt1JW21Xmy3Un_kn64p6rMk_w',
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });

    //     fetch('https://callboard-backend.herokuapp.com/call', requestOptions)
    //       .then(response => response.json())
    //       .then(result => {
    //         console.log(result);
    //       })
    //       .catch(error => console.log('error', error));
    //   } else {
    //     console.log('есть ошибки');
    //     return;
  }

  //   formData.append('photo', photo);

  // console.log(formData.get('photo'));

  // formData.title = nameBillInputEl.value;
  // formData.file = addFileInputEl.files[0];
  // formData.description = addAboutBillInputEl.value;
  // formData.category = addCategoryInputEl.value;
  // formData.price = addPriceInputEl.value;
  // formData.phone = addTelefonInputEl.value;

  //   const url = `https://callboard-backend.herokuapp.com/call`;
  //   // const url = `https://callboard-backend.herokuapp.com/call?id=5fd7715e09d4b90017825519`;

  //   const body = formData;
  //   toAddBill(url, body, token)
  //     .then(data => {
  //       console.log('data', data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
}

// const toAddBill = function (URL, BODY, TOKEN1) {
//   async function postData(
//     url = URL,
//     data = BODY,
//     method = 'POST',
//     token1 = TOKEN1,
//   ) {
//     const response = await fetch(url, {
//       method: method, // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token1}`,
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *client
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     });

//     return await response.json();

//     // parses JSON response into native JavaScript objects
//   }
//   return postData();
// };

function formValidate(form) {
  let errorData = 0;
  let formReq = document.querySelectorAll('._req');

  for (let i = 0; i < formReq.length; i += 1) {
    const input = formReq[i];
    formRemoveError(input);

    if (input.classList.contains('_name')) {
      if (nameTest(input)) {
        formAddError(input);
        errorData += 1;
        error({
          text: 'Введіть коректну назву товару 3 символа мин.',
          type: 'info',
          animateSpeed: 'normal',
          delay: 3000,
        });
        //   пенетифай для шибки поля name
      }
    } else if (input.classList.contains('_description')) {
      if (descriptionTest(input)) {
        formAddError(input);
        errorData += 1;
        error({
          text: 'Коректний опис товару - мінімум 30 символів',
          type: 'info',
          animateSpeed: 'normal',
          delay: 3000,
        });
        //   пенетифай для шибки поля описания
      }
    } else if (input.classList.contains('_phone')) {
      if (telefonTest(input)) {
        formAddError(input);
        errorData += 1;
        error({
          text: 'Введіть номер телефону',
          type: 'info',
          animateSpeed: 'normal',
          delay: 3000,
        });
        //   пенетифай для шибки поля телефон
      }
    } else if (input.classList.contains('_category')) {
      console.log('category', !input.classList.contains('_category'));
      if (catigoryTest(input)) {
        formAddError(input);
        errorData += 1;
      }
    } else if (input.classList.contains('_price')) {
      if (priceTest(input)) {
        formAddError(input);
        errorData += 1;
      }
    } else if (imageList.children.length < 2 || imageList.children.length > 5) {
      //валидация списка картинок
      formAddError(input);
      errorData += 1;
      //   error({
      //     text: 'Потрібно добавити від 1-го до 5-ти фото',
      //     type: 'info',
      //     animateSpeed: 'normal',
      //     delay: 3000,
      //   });
    }
  }
  return errorData;
}

function formAddError(input) {
  input.parentElement.classList.add('_error');
  input.classList.add('_error');
  input.nextElementSibling.classList.add('visible');
}
function formRemoveError(input) {
  input.parentElement.classList.remove('_error');
  input.classList.remove('_error');
  input.nextElementSibling.classList.remove('visible');
}
function nameTest(element) {
  console.log(element.value.length);
  return element.value.length < 3 || element.value.length >= 15;
}
function descriptionTest(element) {
  return element.value.length < 15;
}
function telefonTest(element) {
  return !/^\+380\d{3}\d{2}\d{2}\d{2}$/.test(element.value);
}
function catigoryTest(element) {
  console.log(element);
  if ((element.value === 'work' || element.value === 'for-free') && price.value !== '0') {
    console.log('ошибка1');
    error({
      text: 'Ціна для цїєї категорії має бути 0',
      type: 'info',
      animateSpeed: 'normal',
      delay: 3000,
    });

    return true;
  }
  if (element.value === 'category') {
    console.log('ошибка2');
    error({
      text: 'Виберіть категорію',
      type: 'info',
      animateSpeed: 'normal',
      delay: 3000,
    });

    return true;
  }
}
function priceTest(element) {
  if ((!Number(element.value) && Number(element.value) !== 0) || element.value === '') {
    console.log('Введіть коректну ціну товару');
    error({
      text: 'Введіть коректну ціну товару',
      type: 'info',
      animateSpeed: 'normal',
      delay: 3000,
    });
    return true;
  }
}

formImage.addEventListener('change', () => {
  uploadFile(formImage.files[0]);
});

function uploadFile(file) {
  //проверяем тип файла
  if (!['image/jpeg'].includes(file.type)) {
    error({
      text: 'Можна добавляти фото тільки формату .jpeg!',
      type: 'info',
      animateSpeed: 'normal',
      delay: 3000,
    });

    addImage.value = '';
    return;
  }
  //проверяем размер файла
  if (file.size > 3 * 1024 * 1024) {
    error({
      text: 'Фото має бути мньше ніж 3 МБ.',
      type: 'info',
      animateSpeed: 'normal',
      delay: 3000,
    });
    return;
  }
  let reader = new FileReader();
  reader.onload = function (e) {
    imageList.insertAdjacentHTML(
      'beforeend',
      `<li class="image-preview__item"><img src="${e.target.result}" width="84";
  height="50";alt="" />
  </li>`,
    );
    // imageList.addEventListener('click', e => {
    // console.dir(imageList.children.length);
    // for (let elem of imageList.children) {
    //   elem.innerHTML = '';
    // }
    // console.log('event', e);
    // const elem = [
    //   imageList.children[2],
    //   imageList.children[3],
    //   imageList.children[4],
    // ];
    // elem.forEach(oneImg => {
    //   oneImg.innerHTML = '';
    // });
    // imageList.children[2].innerHTML = '';
    // imageList.children[3].innerHTML = '';
    // imageList.children[4].innerHTML = '';
    // console.log(formImage.files);
    // formImage.files = formImage.files.defaultValue;
    // console.log(formImage.files);
    // file.value = file.defaultValue;
    // });
  };
  reader.onerror = function (e) {
    error({
      text: 'Помилка завантаження фото!',
      type: 'info',
      animateSpeed: 'normal',
      delay: 3000,
    });
  };
  reader.readAsDataURL(file);
}

// function uploadFile(file) {
//   //проверяем тип файла
//   if (!['image/jpeg'].includes(file.type)) {
//     alert('Можна добавляти фото тільки формату .jpeg!');
//     addImage.value = '';
//     return;
//   }

//   //проверяем размер файла
//   if (file.size > 3 * 1024 * 1024) {
//     alert('Фото має бути мньше ніж 3 МБ.');
//   }
//   let reader = new FileReader();
//   reader.onload = function (e) {
//     imageList.insertAdjacentHTML(
//       'beforeend',
//       `<li class="image-preview__item"><img src="${e.target.result}" alt="" /></li>`,
//     );
//   };
//   reader.onerror = function (e) {

//       error({
//         text: 'Помилка завантаження фото!',
//         type: 'info',
//         animateSpeed: 'normal',
//         delay: 3000,
//       });
//   };
//   reader.readAsDataURL(file);
// }
