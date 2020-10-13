import { getData } from "./getData.js";
import userData from "./userData.js";



const COUNTER = 6;
// const wishList = ['idd005', 'idd100', 'idd077', 'idd033'];

const generateGoogsPage = () => {

  const mainHeader = document.querySelector('.main-header');
  

  const generateCards = (data) => {
    const goodsList = document.querySelector('.goods-list');
    goodsList.textContent = '';

    if(!data.length){
      const goods = document.querySelector('.goods');
      goods.textContent = location.search === '?wishlist' ? "Список желаний пуст" : "К сожалению, по Вашему запросу ничего не найдено";
    }

    data.forEach( item => {
      goodsList.insertAdjacentHTML('afterbegin', `
       
        <li class="goods-list__item">
					<a class="goods-item__link" href="card.html#${item.id}">
						<article class="goods-item">
							<div class="goods-item__img">
								<img src=${item.img[0]}
									 data-second-image=${item.img[1] ? `data-second-image=${item.img[1]}` : ''}>
              </div>
              ${ item.count >= COUNTER ? `<p class="goods-item__new">НОВИНКА</p>` : ''}
              ${ !item.count ? `<p class="goods-item__new">Нет в наличии</p>` : ''}
							<h3 class="goods-item__header">${item.name}</h3>
							<p class="goods-item__description">${item.description}</p>
							<p class="goods-item__price">
								<span class="goods-item__price-value">${item.price}</span>
								<span class="goods-item__currency"> УЕ</span>
							</p>
							${ item.count ? `<button class="btn btn-add-card" aria-label="Добавить в корзину" data-idd=${item.id}></button>` : ''}
						</article>
					</a>
				</li>
      `)
    })

    goodsList.addEventListener('click', e => {
      const btnAddCard = e.target.closest('.btn-add-card');
      if(btnAddCard){
        e.preventDefault();
        userData.cartList = btnAddCard.dataset.idd;

      }
    })
  }

  if(location.pathname.includes('goods') && location.search) {
    const search = decodeURI (location.search);
    
    const prop = search.split('=')[0].substring(1);
    
    const value = search.split('=')[1];
    

    if( prop === 'search') {
      getData.search(value, generateCards );
      mainHeader.textContent = `Поиск: ${value}`;
    } else if(prop === 'wishlist') {
      // console.log(wishList);
      getData.getWish( userData.wishList, generateCards );
      mainHeader.textContent = `Список желаний`;
    } else if( prop=== 'cat' || prop === 'subcat'){
      console.log(prop, value);
      getData.getCategory(prop, value, generateCards );
      mainHeader.textContent = value;
    } 
    
  }

  
};

export default generateGoogsPage;

/*
function reverse(str) {
  // console.log(str.length);
  let revStr = '';
  let ind = str.length - 1;
  
    
    while ( ind>=0) {

      revStr += str[ind];
      // console.log(revStr);
      ind--;
    }
  
  return revStr;
}

console.log(reverse('Yallo'));
console.log(reverse('cat'));

let x = 5;
let y = 10;

console.log(x++ + ++y);
*/