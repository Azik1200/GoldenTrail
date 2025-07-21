import "./FavBusket.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFav,
  clearFav,
  increaseQuantity,
  decreaseQuantity,
  setFavorites,
} from "../../redux/AddFav";
import { addItem } from "../../redux/CardSlice";
import { addCartItem, productToCartItem } from "../../api/cart";
import {
  fetchFavorites,
  removeFavorite as apiRemoveFavorite,
} from "../../api/favorites";
import { optionLabel, optionKey } from "../../utils/options";
import formatPrice from "../../utils/formatPrice";
import person from "../../assets/img/person.png";
import bahyli from "../../assets/img/bahyli.png";
import dezenfekiciya from "../../assets/img/dezenfekciya.png";
import { useContext, useEffect } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function FavBusket() {
  const { t } = useContext(LanguageContext);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const load = async () => {
      try {
        const data = await fetchFavorites();
        if (Array.isArray(data)) dispatch(setFavorites(data));
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [dispatch]);

  const handleRemove = async (id) => {
    dispatch(removeFav(id));
    try {
      await apiRemoveFavorite(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (product) => {
    dispatch(addItem(product));
    try {
      const item = productToCartItem(product, {
        size: optionKey(product.selectedSize || product.size),
        color: optionKey(product.selectedColor || product.color),
        quantity: product.quantity,
      });
      await addCartItem(item);
    } catch (err) {
      console.error(err);
    }
  };

  const total = favorites.reduce((sum, item) => {
    const raw = item.mainPrice ?? item.price ?? "0";
    const price = parseFloat(String(raw).replace(/\s|₽|₼/g, ""));
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  const categories = [
    { id: 1, slug: "xr", name: t("categories.xr"), bg: person },
    { id: 2, slug: "disposable", name: t("categories.disposable"), bg: bahyli },
    { id: 3, slug: "antiseptics", name: t("categories.antiseptics"), bg: dezenfekiciya },
  ];

  return (
    <div className="container-FavBusket">
      <div className="FavBusket-Block">
        {favorites.length === 0 ? (
          <>
            <div className="FavBusket-Empty">
              <p>{t("busket.favorites_empty")}</p>
            </div>
            <div className="FavBusket-categories-list">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="FavBusket-category-card"
                  style={{ backgroundImage: `url(${category.bg})` }}
                >
                  <h3 className="FavBusket-category-name">{category.name}</h3>
                  <Link
                    to={`/Filter?catalog=${category.slug}`}
                    className="btn-main btn"
                  >
                    {t("busket.go_to_catalog")}
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="FavBusket-Block-newcard">
              {favorites.map((item) => (
                <div className="FavBusket-Block-Obj" key={item.id}>
                  <div className="FavBusket-Left-Block">
                    <div className="FavBusket-img">
                      <img src={item.img || item.image} alt={item.name} />
                    </div>
                    <div className="FavBusket-Blok-desc">
                      <h3 className="h3">{item.name}</h3>
                      <ul className="FavBusket-Menu">
                        <li className="FavBusket-Item-Size">
                          <div>{t("busket.size")}</div>
                          <div>
                            {optionLabel(
                              item.selectedSize || item.size || item.sizes?.[0]
                            ) || '-'}
                          </div>
                        </li>
                        <li className="FavBusket-Item-Color">
                          <div>{t("orders_page.color")}</div>
                          <div>
                            {optionLabel(
                              item.selectedColor ||
                                item.color ||
                                item.colors?.[0]
                            ) || '-'}
                          </div>
                        </li>
                        <li className="FavBusket-Item-Quantity">
                          <div>{t("busket.quantity")}</div>
                          <div>{item.quantity}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="FavBusket-Total-Price">
                    <div className="FavBusket-New-Price">{formatPrice(item.mainPrice)}</div>
                    {item.oldPrice && (
                      <div className="FavBusket-Old-Price">{formatPrice(item.oldPrice)}</div>
                    )}
                    <div className="FavBusket-Buttons">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="FavBusket-decrease"
                      >
                        -
                      </button>
                      <span className="FavBusket-Quantity">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="FavBusket-increase"
                      >
                        +
                      </button>
                    </div>
                    <div className="Del-Add">
                      <button
                        className="deleete"
                        onClick={() => handleRemove(item.id)}
                      >
                        {t("busket.delete")}
                      </button>
                      <button className="btn" onClick={() => handleAdd(item)}>
                        {t("busket.add_to_cart")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="FavBusket-Block-Total-Price">
              <div className="FavBusket-Block-Total">
                <div className="FavBusket-Total">{t("busket.total")}</div>
                <div className="FavBusket-Price">
                  {formatPrice(total)}
                </div>
              </div>
              <div className="Delivery-texts">
                <p className="Delivery-text">
                  {t("busket.pay_delivery_info")}
                </p>
                <p className="delivery">{t("busket.no_delivery")}</p>
              </div>
            </div>

            <div className="FavBusket-Buttons">
              <div className="FavBusket-Buttons-add">
                <button className="btn">{t("busket.one_click")}</button>
                <button className="btn">{t("busket.add_all_to_cart")}</button>
              </div>
              <button className="delete" onClick={() => dispatch(clearFav())}>
                {t("busket.clear_favorites")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FavBusket;
