import "./BasketNotification.scss";

const BasketNotification = () => {
  return (
    <>
      <div className="notification active">
        <div className="notificationWrapper">
          <p className="notificationText">Товар добавлен в корзину</p>
          <button className="notificationCloseBtn">
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BasketNotification;
