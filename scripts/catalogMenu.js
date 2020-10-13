
import generateSubCatalog from './generateSubCatalog.js';
import { getData } from './getData.js';




export const catalogMenu = () => {
  const updateSubCatalog = generateSubCatalog();
  

  const btnBurger = document.querySelector('.btn-burger');
  const catalog = document.querySelector('.catalog');
  const btnClose = document.querySelector('.btn-close');
  const catalogList = document.querySelector('.catalog-list');
  const subCatalog = document.querySelector('.subcatalog');
  
  const btnReturn = document.querySelector('.btn-return');
  const subcatalogHeader = document.querySelector('.subcatalog-header');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.insertAdjacentElement('beforeend', overlay);

  const openMenu = () => {
    catalog.classList.add('open');
    overlay.classList.add('active');
  };

  const closeMenu = () => {
    closeSubMenu();
    catalog.classList.remove('open');
    overlay.classList.remove('active');
  };

  const openSubMenu = (e) => {
    e.preventDefault();

    const listItem = e.target.closest('.catalog-list__item');
    if(listItem) {
      // subcatalogHeader.innerHTML = listItem.innerHTML;
      getData.getSubCatalog(e.target.textContent, (data) => {
        updateSubCatalog(e.target.textContent, data);
        subCatalog.classList.add('subopen');
      })

      
    };
  };

  const closeSubMenu = () => {
    subCatalog.classList.remove('subopen');
  }

  btnBurger.addEventListener('click', openMenu);
  btnClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  catalogList.addEventListener('click', openSubMenu);
  // btnReturn.addEventListener('click', closeSubMenu);
  subCatalog.addEventListener('click', (e)=> {
    const btnReturn = e.target.closest('.btn-return');
    if(btnBurger){
      closeSubMenu();
    }
  })

  document.addEventListener('keydown', e => {
    if(e.code === 'Escape') {
      closeMenu();
    }
  })
};