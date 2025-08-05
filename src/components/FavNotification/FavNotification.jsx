const FavNotification = () => {
  return (
    <>
      <div className="notification active">
        <div className="notificationWrapper">
          <p className="notificationText">Товар добавлен в избранное</p>
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
