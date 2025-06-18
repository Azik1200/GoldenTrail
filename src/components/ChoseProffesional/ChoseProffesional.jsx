import "./ChoseProffesional.scss";

import useProducts from "../../hooks/useProducts";
import { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";

import { useDispatch } from "react-redux";
import { addItem } from "../../redux/CardSlice";
import { addCartItem, productToCartItem } from "../../api/cart";
import { optionKey, optionValue, optionLabel } from "../../utils/options";
import { addFav } from "../../redux/AddFav";

import { Link } from "react-router-dom";
import { setCurrentProduct } from "../../redux/CurrentProductSlice";

function ChoseProffesional() {
  const { t } = useContext(LanguageContext);
  const dispatch = useDispatch();

  const handleAddFav = (product) => {
    dispatch(addFav(product));
  };
  const products = useProducts();

  const Item = ({ product }) => {
    const [size, setSize] = useState(product.sizes?.[0] || "");
    const [color, setColor] = useState(product.colors?.[0] || "");

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
      <div className="ChoseProffesional" key={product.id}>
        <div className="ChoseProffesional_top">
          <div className="ChoseProffesional_main-info">
            <div className="ChoseProffesional_img">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="ChoseProffesional_status">{product.status}</div>
            <div className="ChoseProffesional_btns">
              <button className="ChoseProffesional_btn baasket" onClick={handleAdd}></button>
              <button className="ChoseProffesional_btn fav" onClick={() => handleAddFav(product)}></button>
            </div>
          </div>
          <h3>{product.name}</h3>
          <ul className="ChoseProffesional_sizes">
            {product.sizes.map((s, index) => (
              <li
                className={`ChoseProffesional_size-item${
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
        <div className="ChoseProffesional_bottom">
          <div className="ChoseProffesional_bottom-info">
            <div className="ChoseProffesional_price">
              <div className="ChoseProffesional_price_main-price">{product.mainPrice}</div>
              {product.oldPrice && <div className="ChoseProffesional_price_old-price">{product.oldPrice}</div>}
            </div>
            <ul className="ChoseProffesional_colors">
              {product.colors.map((c, index) => (
                <li
                  className={`ChoseProffesional_color-item${
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
          <div className="ChoseProffesional_action">
            <button className="btn-main" onClick={handleAdd}>
              {t("products_block.buy")}
            </button>
            <Link to={`/desc/${product.id}`} className="link-main" onClick={() => dispatch(setCurrentProduct(product))}>
              {t("products_block.more")}
            </Link>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container-ChoseProffesional">
      <h2>{t("products_block.choose")}</h2>
      <div className="ChoseProffesional-objs">
        {products.map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ChoseProffesional;
