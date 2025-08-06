import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

const FavNotification = () => {
  const { t } = useContext(LanguageContext);
  return (
    <>
      <div className="notification active">
        <div className="notificationWrapper">
          <p className="notificationText">{t("notifications.added_to_favorites")}</p>
          <button className="notificationCloseBtn">
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </>
  );
};

export default FavNotification;
