import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { setItems } from "../redux/CardSlice";
import favoritesReducer, { setFavorites } from "../redux/AddFav";
import currentProductReducer from "../redux/CurrentProductSlice";

const LOCAL_CART_KEY = "cartItems";
const LOCAL_FAV_KEY = "favoritesItems";

function loadLocalCart() {
  try {
    const raw = localStorage.getItem(LOCAL_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCart(items) {
  try {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
  } catch {
    // ignore write errors
  }
}

function loadLocalFavorites() {
  try {
    const raw = localStorage.getItem(LOCAL_FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalFavorites(items) {
  try {
    localStorage.setItem(LOCAL_FAV_KEY, JSON.stringify(items));
  } catch {
    // ignore write errors
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    currentProduct: currentProductReducer,
  },
});

// Initialize cart and favorites from localStorage when user is not authenticated
if (!localStorage.getItem("token")) {
  const items = loadLocalCart();
  if (items.length) {
    store.dispatch(setItems(items));
  }
  const favs = loadLocalFavorites();
  if (favs.length) {
    store.dispatch(setFavorites(favs));
  }
}

// Persist cart to localStorage for guest users
store.subscribe(() => {
  if (!localStorage.getItem("token")) {
    const state = store.getState();
    saveLocalCart(state.cart);
    saveLocalFavorites(state.favorites);
  }
});
