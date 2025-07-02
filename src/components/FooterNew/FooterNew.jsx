import "./FooterNew.scss";
import logo from "./../../assets/img/Logo.svg";

import { Link } from "react-router-dom";

const FooterNew = () => {
  return (
    <>
      <div className="footerNewContactsMapWrapper">
        <div className="footerNewContactsMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3039.093593881906!2d49.82673824767082!3d40.38461822417597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2saz!4v1750765303811!5m2!1sru!2saz"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="footerNewContactsMapMobile">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.1205089196314!2d49.82577387582558!3d40.38402167144489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d997e6d84ed%3A0x2c4a9b12473f59a5!2sDeluxe%20Palace!5e0!3m2!1sru!2saz!4v1750769308199!5m2!1sru!2saz"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="container">
          <div className="contactsInfoWrapper">
            <h2 className="h2 contactsFooterHeader">Контакты</h2>
            <ul className="contactsFooterList">
              <li className="contactsFooterListItem">
                <a href="tel:+994103231074">
                  <div className="contactsFooterListItemIcon phone"></div>
                  <div className="contactsFooterListItemText">
                    +994 10 323 10 74
                  </div>
                </a>
              </li>
              <li className="contactsFooterListItem">
                <div>
                  <div className="contactsFooterListItemIcon workHours"></div>
                  <div className="contactsFooterListItemText">
                    Режим работы с 9:00-18:00
                  </div>
                </div>
              </li>
              <li className="contactsFooterListItem">
                <a href="mailto:info@goldentrail.az">
                  <div className="contactsFooterListItemIcon mail"></div>
                  <div className="contactsFooterListItemText">
                    info@goldentrail.az
                  </div>
                </a>
              </li>
              <li className="contactsFooterListItem">
                <div>
                  <div className="contactsFooterListItemIcon addres"></div>
                  <div className="contactsFooterListItemText">
                    Jafar Jabbarli, 37. Deluxe Palace
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footerNew">
        <div className="container">
          <div className="footerNewTop">
            <div className="footerNewWrapper">
              <div className="footerNewItem">
                <div className="footerNewItemName">Меню</div>
                <ul className="footerNewItemList">
                  <li className="footerNewItemListItem">
                    <a href="#">Личный кабинет</a>
                  </li>
                  <li className="footerNewItemListItem">
                    <a href="#">Вход/Регистрация</a>
                  </li>
                  <li className="footerNewItemListItem">
                    <a href="#">Корзина</a>
                  </li>
                  <li className="footerNewItemListItem">
                    <a href="#">Избранное</a>
                  </li>
                  <li className="footerNewItemListItem">
                    <a href="#">О нас</a>
                  </li>
                </ul>
              </div>
              <div className="footerNewCatalogs">
                <div className="footerNewCatalogItem">
                  <div className="footerNewCatalogItemName">
                    Рентгенозащитная продукция
                  </div>
                  <ul className="footerNewCatalogItemList">
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Фартуки</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Юбки и жилеты</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Защитные халаты</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Комбинированные костюмы</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Брюшные и тазовые экраны</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Одеяла с защитой</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Колпаки и шапки</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Рентгенозащитные перчатки</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Защитные очки</a>
                    </li>
                  </ul>
                </div>
                <div className="footerNewCatalogItem">
                  <div className="footerNewCatalogItemName">
                    Одноразовая продукция
                  </div>
                  <ul className="footerNewCatalogItemList">
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Медицинские перчатки</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Маски</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Колпаки и шапочки</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Халаты одноразовые</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Комбинезоны защитные</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Бахилы</a>
                    </li>
                  </ul>
                </div>
                <div className="footerNewCatalogItem">
                  <div className="footerNewCatalogItemName">
                    Антисептики и дезинфекция
                  </div>
                  <ul className="footerNewCatalogItemList">
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Кожные антисептики</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Дезинфицирующие средства для поверхностей</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Средства для инструментов</a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">
                        Средства для санитарной обработки помещений
                      </a>
                    </li>
                    <li className="footerNewCatalogItemListItem">
                      <a href="#">Дозаторы и аксессуары</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footerNewBottom">
          <div className="container">
            <div className="footerNewBottomWrapper">
              <div className="footerNewBottomLeft">
                <a href="/" className="footerNewBottomLogo">
                  <img src={logo} alt="Golden Trail" />
                </a>
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerNewBottomLink"
                >
                  Политика конфиденциальности
                </a>
                <a
                  href="/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerNewBottomLink"
                >
                  Договор оферты
                </a>
              </div>
              <div className="footerNewBottomRight">
                <p className="footerNewBottomLink">2025</p>
                <a href="#" className="footerNewBottomLink">
                  Разработка сайта <span>idarelab.az</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterNew;
