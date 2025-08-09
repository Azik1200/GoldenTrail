import "./BasketNotification.scss";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { NotificationContext } from "../../context/NotificationContext.jsx";

const BasketNotification = () => {
  const { t } = useContext(LanguageContext);
  const { cartVisible, hideCart } = useContext(NotificationContext);
  return (
    <div className={`notification${cartVisible ? " active" : ""}`}>
      <div className="notificationWrapper">
        <p className="notificationText">{t("notifications.added_to_cart")}</p>
        <button className="notificationCloseBtn" onClick={hideCart}>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default BasketNotification;
