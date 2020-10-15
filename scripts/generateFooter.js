import {getData} from './getData.js';

const generateFooter = () => {

   getData.getCatalog( (data) => {
        // console.log(data);
        let catalogList = '';
        data.forEach( item => {
            catalogList += `
                <li class="footer-list">
                    <a href="goods.html?cat=${item}">${item}</a>
                </li>
            `;
        })
        const footerHTML = `
            <footer>
                <div class="container">
                    <div class="footer">
                        <div class="footer-catalog">
                            <h2 class="footer-header">Каталог</h2>
                            <ul>
                            ${catalogList}
                                
                            </ul>
                        </div>
                        <div class="footer-about">
                            <h2 class="footer-header">Все о нас</h2>
                            <ul>
                                <li class="footer-list"><a href="index.html">О компании</a></li>
                                <li class="footer-list"><a href="index.html">Демократичный дизайн</a></li>
                                <li class="footer-list"><a href="index.html">Работа у нас</a></li>
                                <li class="footer-list"><a href="index.html">Люди и планета</a></li>
                            </ul>
                        </div>
                        <div class="footer-connection">
                            <h2 class="footer-header">Свяжитесь с нами</h2>
                            <ul>
                                <li class="footer-list"><a href="index.html">Обратная связь</a></li>
                                <li class="footer-list"><a href="index.html">Контакты</a></li>
                                <li class="footer-list"><a href="index.html">Магазины и студии</a></li>
                                
                                <li class="footer-list"><a href="index.html">Поставщикам</a></li>
                                <li class="footer-list"><a href="index.html">Пресс-служба</a></li>
                                <li class="footer-list"><a href="index.html">Вопросы и ответы</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </footer>
        `;
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    });
    
  
};

export default generateFooter;


// <li class="footer-list"><a href="goods.html?cat=Мебель">Мебель</a></li>
// <li class="footer-list"><a href="goods.html?cat=Кухня">Кухня</a></li>
// <li class="footer-list"><a href="goods.html?cat=Текстиль">Текстиль</a></li>
// <li class="footer-list"><a href="goods.html?cat=Освещение">Освещение</a></li>
// <li class="footer-list"><a href="goods.html?cat=Декор">Декор</a></li>