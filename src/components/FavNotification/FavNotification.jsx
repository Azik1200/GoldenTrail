import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { NotificationContext } from "../../context/NotificationContext.jsx";

const FavNotification = () => {
  const { t } = useContext(LanguageContext);
  const { favVisible, hideFav } = useContext(NotificationContext);
  return (
    <div className={`notification${favVisible ? " active" : ""}`}>
      <div className="notificationWrapper">
        <p className="notificationText">
          {t("notifications.added_to_favorites")}
        </p>
        <button className="notificationCloseBtn" onClick={hideFav}>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default FavNotification;
