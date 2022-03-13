import { updateState, updatedContent } from './rout-main'
import { refMainContainer } from '../header/render-categories-taras'

// const listCategories = document.querySelector('.categories');

const viewAllFromCategory = (e) => {
    const elem = e.target;
    if (!elem.classList.contains("current-page")) return
    // console.log(elem.classList.contains("category-it"));
    e.preventDefault();
    let value = elem.getAttribute('data-category');
    updateState(`/category?value=${value}`);
    updatedContent();
    // console.log(history.state);
    // console.log(value);
}

refMainContainer.addEventListener('click', viewAllFromCategory)