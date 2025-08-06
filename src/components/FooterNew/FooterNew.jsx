import "./FooterNew.scss";
import logo from "./../../assets/img/Logo.svg";

import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchCatalogs } from "../../api/catalogs";

const FooterNew = () => {
  const { t, language } = useContext(LanguageContext);
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    fetchCatalogs()
      .then((data) => setCatalogs(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, [language]);

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
            <h2 className="h2 contactsFooterHeader">{t("contacts_section.title")}</h2>
            <ul className="contactsFooterList">
              <li className="contactsFooterListItem">
                <a href="tel:+994103231074">
                  <div className="contactsFooterListItemIcon phone"></div>
                  <div className="contactsFooterListItemText">
                    +994 10 323 10 74
                  </div>
                </a>
              </li>
              <li className="contactsFooterListItem">
                <div>
                  <div className="contactsFooterListItemIcon workHours"></div>
                  <div className="contactsFooterListItemText">
                    {t("contacts_section.work_hours")}
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
              <div className="footerNewItemName">{t("footer.menu")}</div>
              <ul className="footerNewItemList">
                <li className="footerNewItemListItem">
                    <Link to="/LR">{t("footer.personal")}</Link>
                </li>
                <li className="footerNewItemListItem">
                    <Link to="/LR">{t("footer.login_registration")}</Link>
                </li>
                <li className="footerNewItemListItem">
                    <Link to="/Busket">{t("footer.cart")}</Link>
                </li>
                <li className="footerNewItemListItem">
                    <Link to="/favorites">{t("footer.favorites")}</Link>
                </li>
                <li className="footerNewItemListItem">
                    <Link to="/about">{t("footer.about")}</Link>
                </li>
              </ul>
              </div>
              <div className="footerNewCatalogs">
                {catalogs.map((cat) => (
                  <div key={cat.id} className="footerNewCatalogItem">
                    <div className="footerNewCatalogItemName">{cat.name}</div>
                    <ul className="footerNewCatalogItemList">
                      {cat.categories?.map((child) => (
                        <li
                          key={child.id}
                          className="footerNewCatalogItemListItem"
                        >
                          <Link to={`/Filter?category=${child.slug}`}>{child.name || child.slug}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
                  {t("footer.privacy_policy")}
                </a>
                <a
                  href="/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerNewBottomLink"
                >
                  {t("footer.terms_of_service")}
                </a>
              </div>
              <div className="footerNewBottomRight">
                <p className="footerNewBottomLink">2025</p>
                <a href="/" className="footerNewBottomLink">
                  {t("footer.development")}
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
