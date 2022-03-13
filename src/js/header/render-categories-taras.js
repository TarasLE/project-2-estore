
// import containerInitialTpl from './templates/initial page/container-initial.hbs';
// import CardsInitialTpl from './templates/initial page/card-initial.hbs';

// import containerOnsaleTpl from '../../templates/container-on-sale-good.hbs';
import containerInitialTpl from '../../templates/container-initial.hbs';
import CardsInitialTpl from '../../templates/card-initial.hbs';
import Swiper from 'swiper/bundle';
import { changeTplSet, renderOtionalCont} from '../main/catigoriesApi'

// import {onSlider} from '../slider/slider'
// import CardsOnSaleTpl from '../../templates/card-onsale.hbs';

// console.log(`WORKING OF FUNCTION" ${ renderOtionalCont}`);

// const refChosenCategory = document.querySelector(.main-containet)
export let refMainContainer = document.querySelector('.main-containet');
const refPaginationStartCategories = document.querySelector('.all-button');
var currentCategory;
let currentPageButton = 1;
var initBtn = document.getElementById("init-btn");
let SaleBoxContent;

refPaginationStartCategories.addEventListener('click', mainPagination);
refMainContainer.addEventListener('click', renderChosenCategory);
// console.log(refPaginationStartCategories);



const categoryNames = {
    sales1: "РОЗПРОДАЖ", 
    sales2: "РІЗНЕ",
    recreationAndSport: "ВІДПОЧИНОК І СПОРТ",
    free: "ВІДДАМ БЕЗКОШТОВНО",
    businessAndServices: "БІЗНЕС ТА ПОСЛУГИ",
    work: "РОБОТА",
    electronics: "ЕЛЕКТРОНІКА",
    property: "НЕРУХОМІСТЬ",
    transport: "ТРАНСПОРТ",
    trade: "ОБМІН"
}

function mainPagination(event) {
    // if (event.target.className = 'work-button' && event.target.innerText !== 1) {
    //     return
    // }
       
    if (event.target.className = 'work-button') {
        event.preventDefault();
        initBtn.classList.remove("active");
        // console.log(event.target.innerText !== 1);
        clearCategoryContainer()
        currentPageButton = event.target.innerText;
        renderCategories();
        // console.log(currentPageButton);
    }
}

// function clearCategoryContainer() {
//    refMainContainer.innerHTML = ''; 
// }

export const clearCategoryContainer = () => {
   refMainContainer.innerHTML = ''; 
}





function fillNameOfContainers(name) {
    let refNameCardContainer = document.querySelector(`.cont-name-${name}`);
    if (name === 'sales') {
        refNameCardContainer.insertAdjacentHTML('beforeend', categoryNames["sales1"] + "<span class ='vert-line devider'>|</span>" +  categoryNames["sales2"] )
    }
    else {
        refNameCardContainer.insertAdjacentHTML('beforeend', categoryNames[name])
    }
}

function renderSalesCards() {
    var refCardOnSaleCont = document.querySelectorAll('.container-sales .old-price-st-p.is-hidden');
        refCardOnSaleCont.forEach(el => {
            var refCardOnSale = document.querySelector('.container-sales .old-price-st-p.is-hidden');
            refCardOnSale.classList.remove("is-hidden")
        })
        var refСontainerOnSale = document.querySelector('.container-sales .header-onsale-cont');
        refСontainerOnSale.classList.remove("header-onsale-cont");
        refСontainerOnSale.classList.add("header-onsale-cont-on-sale");
        var refСontainerOnSale2 = document.querySelector('.container-sales .catigories-container');
        refСontainerOnSale2.classList.remove("catigories-container");
        refСontainerOnSale2.classList.add("catigories-container-on-sale");
}

function renderCardsToCategories(category) {
        // const refOnSaleCardContainer = document.querySelector('.cont-initial-sales');
	var refCurretnCategory = document.querySelector(`.cont-initial-${currentCategory}`)
	refCurretnCategory.insertAdjacentHTML('beforeend', CardsInitialTpl(category));
    onSlider(currentCategory);
    if (currentCategory === "sales") {
        renderSalesCards()
    }
    
	
		
}

function renderChosenCategories(category) {
    const refOptUlContainer = document.querySelector('.optContUl');
    if (category === "sales") {
        refOptUlContainer.insertAdjacentHTML('beforeend', SaleBoxContent);
    }
    else{
    refOptUlContainer.insertAdjacentHTML('beforeend', CardsInitialTpl(category));
    }
    changeTplSet();
}

function fetchCategories() {
    
    const option = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
               Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQzMzYxZjgwZGFiZDAwMTc5ZDdmZjYiLCJzaWQiOiI1ZmQzMzY0MjgwZGFiZDAwMTc5ZDdmZjkiLCJpYXQiOjE2MDc2Nzc1MDYsImV4cCI6MTYwNzY4MTEwNn0.RnvvG68q1yWWaIVr777cLMJg-eNwugnc7x5ldqFuoNM',
       
          },
    }
    const url = `https://callboard-backend.herokuapp.com/call?page=${currentPageButton}`;
    
    const response = fetch(url, option).then(response => response.json()).then(data =>
    {
       return data;
    });
    return response;
};

function fetchChosenCategory(category) {
    
    const option = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
               Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQzMzYxZjgwZGFiZDAwMTc5ZDdmZjYiLCJzaWQiOiI1ZmQzMzY0MjgwZGFiZDAwMTc5ZDdmZjkiLCJpYXQiOjE2MDc2Nzc1MDYsImV4cCI6MTYwNzY4MTEwNn0.RnvvG68q1yWWaIVr777cLMJg-eNwugnc7x5ldqFuoNM',
       
          },
    }
    // const url = `https://callboard-backend.herokuapp.com/call?page=${currentPageButton}`;
    const url = `https://callboard-backend.herokuapp.com/call/specific/${category}`;
    
    const response = fetch(url, option).then(response => response.json()).then(data =>
    {
       return data;
    });
    return response;
};

function RenderContainersByPage(element) {
            document.getElementById('myCabinetDiv').hidden = true;
            refMainContainer.insertAdjacentHTML('beforeend', containerInitialTpl(element))
 }


function renderCategories() {
    fetchCategories().then(data => {
        // let curData = data;
        let categoriesArr = Object.keys(data);
            categoriesArr.forEach(element => {
                currentCategory = element;
                RenderContainersByPage(element);
                fillNameOfContainers(element);
                renderCardsToCategories(data[element])
                       
        })
    })
}

function renderChosenCategory(event) {
    
    const elem = event.target;
    if (!elem.classList.contains("current-page")) return
    event.preventDefault();
    let value = elem.getAttribute('data-category');
    if (value === "sales") {
        const refSaleBoxContent = document.querySelector('.cont-initial-sales');
        SaleBoxContent = refSaleBoxContent.innerHTML;
        // renderChosenCategories(value);
    }
    console.log(value);
    clearCategoryContainer();
    renderOtionalCont();
    if (value === "sales") {
        renderChosenCategories(value);
    }
    // fetchChosenCategory(value);
    else{
        fetchChosenCategory(value).then(renderChosenCategories);
        }
    // console.log(value);
    // changeTplSet();
    // e.preventDefault();
   
}
  function onSlider() {
  document.querySelectorAll(`.swiper-${currentCategory}`).forEach(function (elem) {
    // console.dir(elem);
    new Swiper(elem, {
      navigation: {
        nextEl: elem.previousElementSibling.lastElementChild,
        prevEl: elem.previousElementSibling.firstElementChild,
      },
      slidesPerView: 2,
      direction: 'vertical',
      spaceBetween: 20,
      simulateTouch: false,
      touchRatio: 0,

      breakpoints: {
        // when window width is >= 740px
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
          direction: 'horizontal',
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 20,
          direction: 'horizontal',
        },
      },
    });
  });
}


renderCategories();





