/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useRef, useState } from "react";

export const NotificationContext = createContext({
  cartVisible: false,
  favVisible: false,
  showCart: () => {},
  showFav: () => {},
  hideCart: () => {},
  hideFav: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [cartVisible, setCartVisible] = useState(false);
  const [favVisible, setFavVisible] = useState(false);

  const cartTimer = useRef();
  const favTimer = useRef();

  const hideCart = useCallback(() => {
    setCartVisible(false);
    clearTimeout(cartTimer.current);
  }, []);

  const hideFav = useCallback(() => {
    setFavVisible(false);
    clearTimeout(favTimer.current);
  }, []);

  const showCart = useCallback(() => {
    setCartVisible(true);
    clearTimeout(cartTimer.current);
    cartTimer.current = setTimeout(() => setCartVisible(false), 2000);
  }, []);

  const showFav = useCallback(() => {
    setFavVisible(true);
    clearTimeout(favTimer.current);
    favTimer.current = setTimeout(() => setFavVisible(false), 2000);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ cartVisible, favVisible, showCart, showFav, hideCart, hideFav }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

