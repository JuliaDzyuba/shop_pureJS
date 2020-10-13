import { getData } from './getData.js';
import userData from './userData.js';

const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
    // mode: 'no-cors',
  });
  
  if(!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  };

  return await response.json();
};


const sendCart = () => {
  const cartForm = document.querySelector(('.cart-form'))

  /*
  const data = {
    name: "Unicorn RainbowDash",
    id: 'idd000',
    count: 3,
  };

  cartForm.addEventListener('submit', e => {
    e.preventDefault();
    const cartList = JSON.stringify(data);
    console.log(data);
    console.log('cartList: ', cartList);
    sendData('https://jsonplaceholder.typicode.com/posts', cartList);
  });
  */
  
  cartForm.addEventListener('submit', e => {
    // console.log(cartForm);
    e.preventDefault();

    if(!cartForm.querySelector('input[name="name"]').value.trim() || !cartForm.querySelector('input[name="email"]').value.trim()){
      const modal = document.createElement('div');
      modal.style.cssText =`
      display: block;
      width: 300px;
      text-align: center;
      font-size: 30px;
      color: red;
      margin: 0 auto 20px;
      
      `;
      modal.textContent = "Заполните форму";
      cartForm.prepend(modal);
      setTimeout( () =>{
        modal.style.display = 'none';
      }, 2000)
    } else{
        const formData = new FormData(cartForm);
        
        // formData.set('order', userData.cartList);

        const data = {};

        for ( const [key, value] of formData) {
          data[key] = value;
        };

        data.order = userData.cartList;

        console.log(data);

        sendData('https://jsonplaceholder.typicode.com/posts', JSON.stringify(data))
            .then( () => {
              cartForm.reset();
            })
            .catch( err => console.log(err));
      };

  });

};





const generateCartPage = () => {

  if(location.pathname.includes('cart')) {
    const cartList = document.querySelector('.cart-list');
    const cartTotalPrice = document.querySelector('.cart-total-price');

    const renderCart = (data)=> {
      cartList.textContent= '';
      let totalPrice = 0;
      data.forEach( ({ name, id, img, price, description, count }) => {
        
        let options = '';

        let countUser = userData.cartList.find( item => item.id === id).count;

        if( countUser > count){
          countUser = count;
        }

        for ( let i = 1 ; i <= count ; i++) {
          options += `<option value=${i} ${countUser === i ? 'selected' : ''}>${i}</option>`;
        }

        totalPrice += countUser * price;


        cartList.insertAdjacentHTML('beforeend', `
        <li class="cart-item">
        <hr>
          <div class="product">
            <div class="product__image-container">
              <img src=${img[0]} alt=${name} >
            </div>
            <div class="product__description">
              <h3 class="product__name">
                <a href="card.html#${id}">${name}</a></h3>
              <p class="product_description-text">${description}</p>
            </div>
            <div class="product__prices">
              <div class="product__price-type product__price-type-regular">
                <div>
                  <div class="product__total product__total-regular">${price * countUser}.-</div>
                  ${ countUser > 1 ? `<div class="product__price-regular">${price}.-</div>` : ''}
                 
                </div>
              </div>
            </div>
            <div class="product__controls">

              <div class="product-controls__remove">
                <button type="button" class="btn btn-remove" data-idd=${id}>
                  <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                </button>
              </div>
              <div class="product-controls__quantity">
                <select title="Выберите количество" aria-label="Выберите количество" data-idd=${id}>
                  ${options}
                </select>
              </div>
            </div>
          </div>
        </li>
        `)
      });

      cartTotalPrice.textContent = totalPrice;
    };

    getData.getCart(userData.cartList, renderCart);

    cartList.addEventListener('change', e => {
      userData.changeCountCartList = {
        id: e.target.dataset.idd,
        count: parseInt(e.target.value)
      };
      getData.getCart(userData.cartList, renderCart);
    });

    cartList.addEventListener('click', (e) => {
      const btnRemove = e.target.closest('.btn-remove');
      if(btnRemove){
        userData.deleteItemCart = btnRemove.dataset.idd;
        getData.getCart(userData.cartList, renderCart);
      }
     
    });
    getData.getCart(userData.cartList, renderCart);

    sendCart();

  };
};

export default generateCartPage;