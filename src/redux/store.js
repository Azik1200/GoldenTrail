import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { setItems } from "../redux/CardSlice";
import favoritesReducer from "../redux/AddFav";
import currentProductReducer from "../redux/CurrentProductSlice";

const LOCAL_KEY = "cartItems";

function loadLocalCart() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCart(items) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
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

// Initialize cart from localStorage when user is not authenticated
if (!localStorage.getItem("token")) {
  const items = loadLocalCart();
  if (items.length) {
    store.dispatch(setItems(items));
  }
}

// Persist cart to localStorage for guest users
store.subscribe(() => {
  if (!localStorage.getItem("token")) {
    const state = store.getState();
    saveLocalCart(state.cart);
  }
});
