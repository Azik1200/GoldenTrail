import React, { useContext } from "react";
import "./myMap.scss";
import tel from "../../assets/img/telefon.svg";
import clock from "../../assets/img/clock.svg";
import gmail from "../../assets/img/gmail.svg";
import loco from "../../assets/img/loco.svg";
import { LanguageContext } from "../../context/LanguageContext";

function MyMap() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="map-wrapper">
      <iframe
        src="https://www.google.com/maps?q=40.381285,49.873047&hl=ru&z=15&output=embed"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Golden Trail Location"
      ></iframe>

      <div className="contact-card">
        <div className="contacts">{t("contacts_section.title")}</div>
        <div className="contacts-navs">
          <div className="contacts-nav">
            <div className="contacts-img">
              <img src={tel} />
            </div>
            <div className="contacts-elementr">+994 10 323 10 74</div>
          </div>
          <div className="contacts-nav">
            <div className="contacts-img">
              <img src={clock} />
            </div>
            <div className="contacts-elementr">{t("contacts_section.work_hours")}</div>
          </div>
          <div className="contacts-nav">
            <div className="contacts-img">
              <img src={gmail} />
            </div>
            <div className="contacts-elementr">goldentrailaz@gmail.com</div>
          </div>
          <div className="contacts-nav">
            <div className="contacts-img">
              <img src={loco} />
            </div>
            <div className="contacts-elementr">
              13 Sabit Orujev Str, Baku, Azerbaijan AZ1025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyMap;
