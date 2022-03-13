import { updateState, updatedContent } from './rout-main'

const listPages = document.querySelector('.all-button');
const mainPagination = (e) => {
    const elem = e.target;
    if (!elem.classList.contains("work-button")) return
    e.preventDefault();
    let value = elem.getAttribute('data-category');
    updateState(`${value}`);
    updatedContent();
  }

listPages.addEventListener('click', mainPagination)