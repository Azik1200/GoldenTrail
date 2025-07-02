import "./NewProducts.scss";
import useProducts from "../../hooks/useProducts";
import { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/CardSlice";
import { addCartItem, productToCartItem } from "../../api/cart";
import { optionKey, optionValue, optionLabel } from "../../utils/options";
import { addFav } from "../../redux/AddFav";
import { addFavorite, productToFavorite } from "../../api/favorites";
import { Link } from "react-router-dom";
import { setCurrentProduct } from "../../redux/CurrentProductSlice";
import BuyModal from "../BuyModal/BuyModal";

import image from "./../../assets/img/bahil.png";

function NewProducts() {
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
  const products = useProducts().filter((p) => p.is_new);

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
      <div className="newProducts" key={product.id}>
        <div className="newProducts_top">
          <div className="newProducts_main-info">
            <div className="newProducts_img">
              <img src={product.img} alt={product.name} />
              {/* <img src={image} alt={product.name} /> */}
            </div>
            <div className="newProducts_status">{product.status}</div>
            <div className="newProducts_btns">
              <button
                className="newProducts_btn baasket"
                onClick={handleAdd}
              ></button>
              <button
                className={`newProducts_btn fav${
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
          <ul className="newProducts_sizes">
            {product.sizes.map((s, index) => (
              <li
                className={`newProducts_size-item${
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
        <div className="newProducts_bottom">
          <div className="newProducts_bottom-info">
            <div className="newProducts_price">
              <div className="newProducts_price_main-price">
                {product.mainPrice}
              </div>
              {product.oldPrice && (
                <div className="newProducts_price_old-price">
                  {product.oldPrice}
                </div>
              )}
            </div>
            <ul className="newProducts_colors">
              {product.colors.map((c, index) => (
                <li
                  className={`newProducts_color-item${
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
          <div className="newProducts_action">
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
      <div className="container-newproducts">
        <h2>{t("products_block.new")}</h2>
        <div className="newProducts-objs">
          {products.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewProducts;
