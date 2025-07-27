import "./SelectedItem.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  setItems,
} from "../../redux/CardSlice";
import {
  fetchCartItems,
  removeCartItem,
  incrementCartItem,
  decrementCartItem,
} from "../../api/cart";
import { optionLabel } from "../../utils/options";
import formatPrice from "../../utils/formatPrice";
import person from "../../assets/img/person.png";
import bahyli from "../../assets/img/bahyli.png";
import dezenfekiciya from "../../assets/img/dezenfekciya.png";
import { useContext, useEffect } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function SelectedItem() {
  const { t } = useContext(LanguageContext);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const load = async () => {
      try {
        const data = await fetchCartItems();
        if (Array.isArray(data)) {
          dispatch(setItems(data));
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [dispatch]);

  const handleRemove = async (id, key) => {
    dispatch(removeItem(key));
    try {
      await removeCartItem(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIncrease = async (id, key) => {
    dispatch(increaseQuantity(key));
    try {
      await incrementCartItem(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrease = async (id, key) => {
    dispatch(decreaseQuantity(key));
    try {
      await decrementCartItem(id);
    } catch (err) {
      console.error(err);
    }
  };

  const total = cart.reduce((sum, item) => {
    const raw = item.mainPrice ?? item.price ?? '0';
    const price = parseFloat(String(raw).replace(/\s|₽|₼/g, ""));
    return sum + price * (item.quantity || 1);
  }, 0);

  const categories = [
    { id: 1, name: t("categories.xr"), bg: person },
    { id: 2, name: t("categories.disposable"), bg: bahyli },
    { id: 3, name: t("categories.antiseptics"), bg: dezenfekiciya },
  ];

  return (
    <div className="container-SelectedItem">
      {cart.length === 0 ? (
        <>
          <div className="SelectedItem-Empty">
            <p>{t("busket.empty_cart")}</p>
          </div>

          <div className="SelectedItem-categories-list">
            {categories.map((category) => (
              <div
                key={category.id}
                className="SelectedItem-category-card"
                style={{ backgroundImage: `url(${category.bg})` }}
              >
                <h3 className="SelectedItem-category-name">{category.name}</h3>
                <button className="btn-main btn">
                  {t("busket.go_to_catalog")}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="SelectedItem-Block">
            <div className="SelectedItem-Block-newcard">
              {cart.map((item) => (
                <div className="SelectedItem-Block-Obj" key={item._key || item.id || item.product_id}>
                  <div className="SelectedItem-Block-Left">
                    <div className="SelectedItem-img">
                      <img src={item.img || item.image} alt={item.name} />
                    </div>
                    <div className="SelectedItem-Blok-desc">
                      <h3 className="h3">{item.name}</h3>
                      <ul className="SelectedItem-Menu">
                        <li className="SelectedItem-Item-Size">
                          <div>{t("busket.size")}</div>
                          <div>
                            {optionLabel(
                              item.selectedSize || item.size || item.sizes?.[0]
                            ) || '-'}
                          </div>
                        </li>
                        <li className="SelectedItem-Item-Color">
                          <div>{t("orders_page.color")}</div>
                          <div>
                            {optionLabel(
                              item.selectedColor ||
                                item.color ||
                                item.colors?.[0]
                            ) || '-'}
                          </div>
                        </li>
                        <li className="SelectedItem-Item-Quantity">
                          <div>{t("busket.quantity")}</div>
                          <div>{item.quantity}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="SelectedItem-Total-Price">
                    <div className="SelectedItem-New-Price">
                      {formatPrice(item.mainPrice ?? item.price)}
                    </div>
                    {item.oldPrice && (
                      <div className="SelectedItem-Old-Price">
                        {formatPrice(item.oldPrice)}
                      </div>
                    )}
                    <div className="SelectedItem-Buttons">
                      <button
                        onClick={() =>
                          handleDecrease(
                            item.id || item.product_id,
                            item._key || item.id || item.product_id,
                          )
                        }
                        className="SelectedItem-decrease"
                      >
                        -
                      </button>
                      <span className="SelectedItem-Quantity">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleIncrease(
                            item.id || item.product_id,
                            item._key || item.id || item.product_id,
                          )
                        }
                        className="SelecctedItem-increase"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="deleete"
                      onClick={() =>
                        handleRemove(
                          item.id || item.product_id,
                          item._key || item.id || item.product_id,
                        )
                      }
                    >
                      {t("busket.delete")}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="SelectedItem-Block-Total-Price">
              <div className="SelectedItem-Block-Discount">
                <div className="SelectedItem-Discount">{t("busket.discount")}</div>
                <div className="SelectedItem-Discount-total">-0 ₼</div>
              </div>
              <div className="SelectedItem-Block-Total">
                <div className="SelectedItem-Total">{t("busket.total")}</div>
                <div className="SelectedItem-Total-Ptice">
                  <div className="SelectedItem-Price">
                    {formatPrice(total)}
                  </div>
                  <p className="delivery">{t("busket.no_delivery")}</p>
                </div>
              </div>
              <button className="btn">{t("busket.one_click")}</button>
              <p className="Delivery-text">
                {t("busket.pay_delivery_info")}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SelectedItem;
