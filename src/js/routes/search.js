import { updateState, updatedContent } from './rout-main'

let searchInput = document.querySelector('#searchInput');
let btnSearchMod = document.querySelector('#btnSearchMod');
// console.log(btnSearchMod);
let searchProductMod = (e) => {
    // e.preventDefault();
    let value = searchInput.value;
    if (!value) return
    updateState(`/search?value=${value}`);
    updatedContent()
}

btnSearchMod.addEventListener('click', searchProductMod)


