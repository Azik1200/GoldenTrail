import "./FilteredProducts.scss";
import { useState, useEffect } from "react";

import up from "../../assets/img/up.svg";
import vector from "../../assets/img/Vector.svg";

import useProducts from "../../hooks/useProducts";
import { fetchProductFilters } from "../../api/products";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/CardSlice";
import { addCartItem, productToCartItem } from "../../api/cart";
import { optionKey, optionValue, optionLabel } from "../../utils/options";
import formatPrice from "../../utils/formatPrice";
import { addFav } from "../../redux/AddFav";
import { addFavorite, productToFavorite } from "../../api/favorites";

import { Link } from "react-router-dom";
import { setCurrentProduct } from "../../redux/CurrentProductSlice";

function FilteredProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    fetchProductFilters()
      .then((data) => setFilterOptions(data))
      .catch((err) => console.error(err));
  }, []);

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
  const products = useProducts();

  const filteredProducts = products.filter((product) => {
    if (
      selectedBrands.length &&
      product.brand &&
      !selectedBrands.includes(product.brand)
    ) {
      return false;
    }
    if (
      selectedColors.length &&
      !product.colors.some((c) => selectedColors.includes(optionLabel(c)))
    ) {
      return false;
    }
    if (
      selectedSizes.length &&
      !product.sizes.some((s) => selectedSizes.includes(optionLabel(s)))
    ) {
      return false;
    }
    const price = parseFloat(product.mainPrice);
    if (minPrice && price < parseFloat(minPrice)) return false;
    if (maxPrice && price > parseFloat(maxPrice)) return false;
    return true;
  });

  const toggleItem = (list, setList, value) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setMinPrice("");
    setMaxPrice("");
  };

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
      // <div className="container">
      <div className="FilteredProducts" key={product.id}>
        <div className="FilteredProducts_top">
          <div className="FilteredProducts_main-info">
            <div className="FilteredProducts_img">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="FilteredProducts_status">{product.status}</div>
            <div className="FilteredProducts_btns">
              <button
                className="FilteredProducts_btn baasket "
                onClick={handleAdd}
              ></button>
              <button
                className={`FilteredProducts_btn fav${
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
          <ul className="FilteredProducts_sizes">
            {product.sizes.map((s, index) => (
              <li
                className={`FilteredProducts_size-item${
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
        <div className="FilteredProducts_bottom">
          <div className="FilteredProducts_bottom-info">
            <div className="FilteredProducts_price">
              <div className="FilteredProducts_price_main-price">
                {formatPrice(product.mainPrice)}
              </div>
              {product.oldPrice && (
                <div className="FilteredProducts_price_old-price">
                  {formatPrice(product.oldPrice)}
                </div>
              )}
            </div>
            <ul className="FilteredProducts_colors">
              {product.colors.map((c, index) => (
                <li
                  className={`FilteredProducts_color-item${
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
          <div className="FilteredProducts_action">
            <button className="btn-main" onClick={handleAdd}>
              Купить в 1 клик
            </button>
            <Link
              to={`/desc/${product.id}`}
              className="link-main"
              onClick={() => dispatch(setCurrentProduct(product))}
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
      // </div>
    );
  };

  return (
    <div className="container">
      <div className="FilteredProducts-container">
        <h2>Рентгенозащитная продукция</h2>
        <div className="FilteredProducts-Buttons">
          <div className="FilteredProducts-filter">
            <div className="FilteredProducts-name">По умолчанию</div>
            <div className="FilteredProducts-img">
              <img src={up} />
            </div>
          </div>
          <button
            className="FilteredProducts-All"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="FilteredProducts-All-name">Все фильтры</span>
            <div>
              <img src={vector} />
            </div>
          </button>
          <button className="FilteredProducts-delete" onClick={clearFilters}>
            Очистить фильтры
          </button>
        </div>

        {sidebarOpen && filterOptions && (
          <div className="FilterSidebar">
            <div className="FilterSidebar-header">
              <h2>Фильтры</h2>
              <button
                className="close-btn"
                onClick={() => setSidebarOpen(false)}
              >
                ×
              </button>
            </div>
            {filterOptions.brands?.length > 0 && (
              <div className="FilterSidebar-section">
                <h3>Бренды</h3>
                <ul className="FilterSidebar-menu">
                  {filterOptions.brands.map((brand) => (
                    <li key={brand} className="FilterSidebar-menu-item">
                      <label className="custom-checkbox-square">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() =>
                            toggleItem(selectedBrands, setSelectedBrands, brand)
                          }
                        />
                        <span
                          className={
                            selectedBrands.includes(brand) ? "active" : ""
                          }
                        ></span>
                      </label>
                      <span className="section-label-text">{brand}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {filterOptions.colors?.length > 0 && (
              <div className="FilterSidebar-section-color">
                <h3>Цвет</h3>
                <ul className="FilterSidebar-menu">
                  {filterOptions.colors.map((color) => (
                    <li key={color} className="FilterSidebar-menu-item">
                      <label className="custom-checkbox-static">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() =>
                            toggleItem(selectedColors, setSelectedColors, color)
                          }
                        />
                        <span className="checkbox-square"></span>
                      </label>
                      <span
                        className="color-dot"
                        style={{ background: color }}
                      ></span>
                      <span className="section-label-text">{color}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {filterOptions.sizes?.length > 0 && (
              <div className="FilterSidebar-section-size">
                <h3>Размер</h3>
                <ul className="size-list">
                  {filterOptions.sizes.map((size) => (
                    <li key={size} className="size-item">
                      <label className="custom-checkbox-square">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={() =>
                            toggleItem(selectedSizes, setSelectedSizes, size)
                          }
                        />
                        <span className="size-square"></span>
                      </label>
                      <span className="size-label">{size}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="FilterSidebar-section-price">
              <h3>Цена</h3>
              <div className="price-inputs-single">
                <input
                  type="number"
                  placeholder={filterOptions.min_price}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                &nbsp;-&nbsp;
                <input
                  type="number"
                  placeholder={filterOptions.max_price}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <button className="clear-filters" onClick={clearFilters}>
              Очистить фильтры
            </button>
          </div>
        )}

        <div className="FilteredProducts-objs">
          {filteredProducts.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilteredProducts;
