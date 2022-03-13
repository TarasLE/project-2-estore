import { updateState, updatedContent } from './rout-main'

const listCategories = document.querySelector('.categories');

const searchCategories = (e) => {
    const elem = e.target;
    if (!elem.classList.contains("category-it")) return
    // console.log(elem.classList.contains("category-it"));
    e.preventDefault();
    let value = elem.getAttribute('data-category');
    updateState(`/category?value=${value}`);
    updatedContent();
    // console.log(history.state);
    // console.log(value);
}

listCategories.addEventListener('click', searchCategories)