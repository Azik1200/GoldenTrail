import "./FilteredProducts.scss";
import { useState, useEffect, useMemo } from "react";

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

import { Link, useLocation } from "react-router-dom";
import { setCurrentProduct } from "../../redux/CurrentProductSlice";

function FilteredProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const initialCategory = searchParams.get("category") || "";
  const initialCatalog = initialCategory
    ? ""
    : searchParams.get("catalog") || "";
  const [selectedCatalog, setSelectedCatalog] = useState(initialCatalog);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "";
    const cat = category ? "" : params.get("catalog") || "";
    setSelectedCategory(category);
    setSelectedCatalog(cat);
  }, [location.search]);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    fetchProductFilters()
      .then((data) => setFilterOptions(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const body = document.body;
    if (sidebarOpen) {
      body.classList.add("active");
    } else {
      body.classList.remove("active");
    }
    return () => body.classList.remove("active");
  }, [sidebarOpen]);

  useEffect(() => {
    if (filterOptions && selectedCategory) {
      const found = filterOptions.catalogs?.find((cat) =>
        cat.categories?.some((c) => c.slug === selectedCategory)
      );
      if (found && found.slug !== selectedCatalog) {
        setSelectedCatalog(found.slug);
      }
    }
  }, [filterOptions, selectedCategory, selectedCatalog]);

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
  const filterParams = useMemo(() => {
    const params = {};
    if (!selectedCategory && selectedCatalog) params.catalog = selectedCatalog;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedBrands.length) params.brands = selectedBrands;
    if (selectedColors.length) params.colors = selectedColors;
    if (selectedSizes.length) params.sizes = selectedSizes;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    return params;
  }, [
    selectedCatalog,
    selectedCategory,
    selectedBrands,
    selectedColors,
    selectedSizes,
    minPrice,
    maxPrice,
  ]);

  const products = useProducts(filterParams);
  const filteredProducts = products;

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
    setSelectedCatalog("");
    setSelectedCategory("");
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
    );
  };

  const heading = useMemo(() => {
    if (!filterOptions) return "Каталог";
    if (selectedCategory) {
      for (const cat of filterOptions.catalogs || []) {
        const found = cat.categories?.find((c) => c.slug === selectedCategory);
        if (found) return found.name || found.slug;
      }
    }
    if (selectedCatalog) {
      const cat = (filterOptions.catalogs || []).find(
        (c) => c.slug === selectedCatalog
      );
      if (cat) return cat.name || cat.slug;
    }
    return "Каталог";
  }, [filterOptions, selectedCatalog, selectedCategory]);

  return (
    <div className="container">
      <div className="FilteredProducts-container">
        <h2>{heading}</h2>
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

        <div className="FilteredProducts-All-buttns">
          {!selectedCategory && selectedCatalog && (
            <div className="FilteredProducts-All-btn">
              {filterOptions?.catalogs?.find((c) => c.slug === selectedCatalog)
                ?.name || selectedCatalog}
            </div>
          )}
          {selectedCategory && (
            <div className="FilteredProducts-All-btn">
              {filterOptions?.catalogs
                ?.flatMap((c) => c.categories || [])
                .find((c) => c.slug === selectedCategory)?.name ||
                selectedCategory}
            </div>
          )}
          {selectedBrands.map((b) => (
            <div key={`brand-${b}`} className="FilteredProducts-All-btn">
              {b}
            </div>
          ))}
          {selectedColors.map((c) => (
            <div
              key={`color-${optionKey(c)}`}
              className="FilteredProducts-All-btn"
            >
              {optionLabel(c)}
            </div>
          ))}
          {selectedSizes.map((s) => (
            <div
              key={`size-${optionKey(s)}`}
              className="FilteredProducts-All-btn"
            >
              {optionLabel(s)}
            </div>
          ))}
          {(minPrice || maxPrice) && (
            <div className="FilteredProducts-All-btn">
              {minPrice ? `От ${minPrice}` : ""}
              {minPrice && maxPrice ? " - " : ""}
              {maxPrice ? `До ${maxPrice}` : ""}
            </div>
          )}
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
            {filterOptions.catalogs?.length > 0 && (
              <div className="FilterSidebar-section">
                <h3>Каталог</h3>
                <ul className="FilterSidebar-menu">
                  {filterOptions.catalogs.map((cat) => (
                    <li key={cat.slug} className="FilterSidebar-menu-item">
                      <label className="custom-checkbox-square">
                        <input
                          type="radio"
                          name="catalog"
                          checked={selectedCatalog === cat.slug}
                          onChange={() => {
                            setSelectedCatalog(cat.slug);
                            setSelectedCategory("");
                          }}
                        />
                        <span
                          className={
                            selectedCatalog === cat.slug ? "active" : ""
                          }
                        ></span>
                      </label>
                      <span className="section-label-text">{cat.name}</span>
                    </li>
                  ))}
                </ul>
                {selectedCatalog &&
                  filterOptions.catalogs.find((c) => c.slug === selectedCatalog)
                    ?.categories?.length > 0 && (
                    <ul className="FilterSidebar-menu">
                      {filterOptions.catalogs
                        .find((c) => c.slug === selectedCatalog)
                        .categories.map((c) => (
                          <li key={c.slug} className="FilterSidebar-menu-item">
                            <label className="custom-checkbox-square">
                              <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === c.slug}
                                onChange={() => setSelectedCategory(c.slug)}
                              />
                              <span
                                className={
                                  selectedCategory === c.slug ? "active" : ""
                                }
                              ></span>
                            </label>
                            <span className="section-label-text">{c.name}</span>
                          </li>
                        ))}
                    </ul>
                  )}
              </div>
            )}
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
                      <label className="custom-checkbox-square">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() =>
                            toggleItem(selectedColors, setSelectedColors, color)
                          }
                        />
                        <span
                          className={
                            selectedColors.includes(color) ? "active" : ""
                          }
                        ></span>
                      </label>
                      <span
                        className="color-dot"
                        style={{ background: color }}
                      ></span>
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
                        <span
                          className={
                            selectedSizes.includes(size) ? "active" : ""
                          }
                        ></span>
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Item key={product.id} product={product} />
            ))
          ) : (
            <div className="FilteredProducts-empty">
              <p>Нет совпадений.</p>
              <p>
                Ни один товар не соответствует заданым условиям. Попробуйте
                обновить фильтры.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilteredProducts;
