import "./BestSellers.scss";

import useProducts from "../../hooks/useProducts";
import { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/CardSlice";
import { addCartItem, productToCartItem } from "../../api/cart";
import { optionKey, optionValue, optionLabel } from "../../utils/options";
import formatPrice from "../../utils/formatPrice";
import { addFav } from "../../redux/AddFav";
import { addFavorite, productToFavorite } from "../../api/favorites";

import { Link } from "react-router-dom";
import { setCurrentProduct } from "../../redux/CurrentProductSlice";
import BuyModal from "../BuyModal/BuyModal";
import { NotificationContext } from "../../context/NotificationContext.jsx";

function BestSellers() {
  const { t } = useContext(LanguageContext);
  const { showCart, showFav } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const handleAddFav = async (product) => {
    try {
      const fav = productToFavorite(product);
      const data = await addFavorite(fav);
      const payload = { ...product, ...data, product_id: product.id };
      dispatch(addFav(payload));
      showFav();
    } catch (err) {
      console.error(err);
    }
  };
  const products = useProducts().filter((p) => p.is_on_sale).slice(0, 3);

  const Item = ({ product }) => {
    const [size, setSize] = useState(product.sizes?.[0] || "");
    const [color, setColor] = useState(product.colors?.[0] || "");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdd = async () => {
      const selected = { ...product, selectedSize: size, selectedColor: color };
      dispatch(addItem(selected));
      showCart();
      try {
        const item = productToCartItem(selected, {
          size: optionKey(size),
          color: optionKey(color),
        });
        await addCartItem(item);
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div className="BestSellers" key={product.id}>
        <div className="BestSellers_top">
          <div className="BestSellers_main-info">
            <div className="BestSellers_img">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="BestSellers_status">{product.status}</div>
            <div className="BestSellers_btns">
              <button
                className="BestSellers_btn baasket "
                onClick={handleAdd}
              ></button>
              <button
                className={`BestSellers_btn fav${
                  favorites.find(
                    (f) => f.product_id === product.id || f.id === product.id
                  )
                    ? " active"
                    : ""
                }`}
                onClick={() => handleAddFav(product)}
              ></button>
            </div>
          </div>
          <h3>{product.name}</h3>
          <ul className="BestSellers_sizes">
            {product.sizes.map((s, index) => (
              <li
                className={`BestSellers_size-item${
                  optionKey(s) === optionKey(size) ? " active" : ""
                }`}
                onClick={() => setSize(s)}
                key={index}
              >
                {optionLabel(s)}
              </li>
            ))}
          </ul>
        </div>
        <div className="BestSellers_bottom">
          <div className="BestSellers_bottom-info">
            <div className="BestSellers_price">
              <div className="BestSellers_price_main-price">{formatPrice(product.mainPrice)}</div>
              {product.oldPrice && <div className="BestSellers_price_old-price">{formatPrice(product.oldPrice)}</div>}
            </div>
            <ul className="BestSellers_colors">
              {product.colors.map((c, index) => (
                <li
                  className={`BestSellers_color-item${
                    optionKey(c) === optionKey(color) ? " active" : ""
                  }`}
                  onClick={() => setColor(c)}
                  key={index}
                >
                  <span
                    style={{
                      background: optionValue(c),
                    }}
                  ></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="BestSellers_action">
            <button className="btn-main" onClick={() => setIsModalOpen(true)}>
              {t("products_block.buy")}
            </button>
            <Link
              to={`/desc/${product.id}`}
              className="link-main"
              onClick={() => dispatch(setCurrentProduct(product))}
            >
              {t("products_block.more")}
            </Link>
            {isModalOpen && <BuyModal onClose={() => setIsModalOpen(false)} />}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container">
      <div className="container-BestSellers">
        <h2>{t("products_block.best")}</h2>
        <div className="BestSellers-objs">
          {products.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSellers;
