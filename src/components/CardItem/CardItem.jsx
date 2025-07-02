import "./CardItem.scss";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { setCurrentProduct } from "../../redux/CurrentProductSlice";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/CardSlice";
import { addCartItem, productToCartItem } from "../../api/cart";
import { optionValue, optionKey, optionLabel } from "../../utils/options";
import { addFav } from "../../redux/AddFav";
import { addFavorite, productToFavorite } from "../../api/favorites";
import BuyModal from "../BuyModal/BuyModal";
import useProducts from "../../hooks/useProducts";

import image from "./../../assets/img/bahil.png";

function CardItem() {
  const { t } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const handleAddFav = async (product) => {
    try {
      const fav = productToFavorite(product);
      const data = await addFavorite(fav);
      const payload = { ...product, ...data, product_id: product.id };
      dispatch(addFav(payload));
    } catch (err) {
      console.error(err);
    }
  };
  const products = useProducts().filter((p) => p.is_popular);

  const Item = ({ product }) => {
    const [size, setSize] = useState(product.sizes?.[0] || "");
    const [color, setColor] = useState(product.colors?.[0] || "");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdd = async () => {
      const selected = { ...product, selectedSize: size, selectedColor: color };
      dispatch(addItem(selected));
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
      <div className="productCard" key={product.id}>
        <div className="productCard_top">
          <div className="productCard_main-info">
            <div className="productCard_img">
              {/* <img src={product.img} alt={product.name} /> */}
              <img src={image} alt={product.name} />
            </div>
            <div className="productCard_status">{product.status}</div>
            <div className="productCard_btns">
              <button
                className="productCard_btn baasket"
                onClick={handleAdd}
              ></button>
              <button
                className={`productCard_btn fav${
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
          <ul className="productCard_sizes">
            {product.sizes.map((s, index) => (
              <li
                className={`productCard_size-item${
                  optionKey(s) === optionKey(size) ? " active" : ""
                }`}
                style={
                  optionKey(s) === optionKey(size)
                    ? { border: "1px solid #000" }
                    : {}
                }
                onClick={() => setSize(s)}
                key={index}
              >
                {optionLabel(s)}
              </li>
            ))}
          </ul>
        </div>
        <div className="productCard_bottom">
          <div className="productCard_bottom-info">
            <div className="productCard_price">
              <div className="productCard_price_main-price">
                {product.mainPrice}
              </div>
              {product.oldPrice && (
                <div className="productCard_price_old-price">
                  {product.oldPrice}
                </div>
              )}
            </div>
            <ul className="productCard_colors">
              {product.colors.map((c, index) => (
                <li
                  className={`productCard_color-item${
                    optionKey(c) === optionKey(color) ? " active" : ""
                  }`}
                  onClick={() => setColor(c)}
                  key={index}
                >
                  <span
                    style={{
                      background: optionValue(c),
                      border:
                        optionKey(c) === optionKey(color)
                          ? "1px solid #000"
                          : "none",
                    }}
                  ></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="productCard_action">
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
      {" "}
      <div className="container-productCard">
        <h2>{t("products_block.popular")}</h2>
        <div className="productCard-objs">
          {products.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardItem;
