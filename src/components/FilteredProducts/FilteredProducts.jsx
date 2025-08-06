import "./FilteredProducts.scss";
import { useState, useEffect, useMemo, useContext } from "react";

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
import { LanguageContext } from "../../context/LanguageContext";

function FilteredProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const location = useLocation();
  const { t } = useContext(LanguageContext);
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const initialCategories = searchParams.getAll("category");
  const initialCatalogs = searchParams.getAll("catalog");
  const [selectedCatalogs, setSelectedCatalogs] = useState(initialCatalogs);
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categories = params.getAll("category");
    const catalogs = params.getAll("catalog");
    setSelectedCategories(categories);
    setSelectedCatalogs(catalogs);
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
    if (filterOptions && selectedCategories.length) {
      const parents = filterOptions.catalogs
        ?.filter((cat) =>
          cat.categories?.some((c) => selectedCategories.includes(c.slug))
        )
        .map((cat) => cat.slug);
      if (parents?.length) {
        setSelectedCatalogs((prev) =>
          Array.from(new Set([...prev, ...parents]))
        );
      }
    }
  }, [filterOptions, selectedCategories]);

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
    if (selectedCatalogs.length) params.catalog = selectedCatalogs;
    if (selectedCategories.length) params.category = selectedCategories;
    if (selectedBrands.length) params.brands = selectedBrands;
    if (selectedColors.length) params.colors = selectedColors;
    if (selectedSizes.length) params.sizes = selectedSizes;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    return params;
  }, [
    selectedCatalogs,
    selectedCategories,
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
    setSelectedCatalogs([]);
    setSelectedCategories([]);
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
              {t("products_block.buy")}
            </button>
            <Link
              to={`/desc/${product.id}`}
              className="link-main"
              onClick={() => dispatch(setCurrentProduct(product))}
            >
              {t("products_block.more")}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const heading = useMemo(() => {
    if (!filterOptions) return t("filters.catalog");
    if (selectedCategories.length === 1) {
      for (const cat of filterOptions.catalogs || []) {
        const found = cat.categories?.find(
          (c) => c.slug === selectedCategories[0]
        );
        if (found) return found.name || found.slug;
      }
    }
    if (
      selectedCategories.length === 0 &&
      selectedCatalogs.length === 1
    ) {
      const cat = (filterOptions.catalogs || []).find(
        (c) => c.slug === selectedCatalogs[0]
      );
      if (cat) return cat.name || cat.slug;
    }
    return t("filters.catalog");
  }, [filterOptions, selectedCatalogs, selectedCategories, t]);

  return (
    <div className="container">
      <div className="FilteredProducts-container">
        <h2>{heading}</h2>
        <div className="FilteredProducts-Buttons">
          <div className="FilteredProducts-filter">
            <div className="FilteredProducts-name">{t("filters.default")}</div>
            <div className="FilteredProducts-img">
              <img src={up} />
            </div>
          </div>
          <button
            className="FilteredProducts-All"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="FilteredProducts-All-name">{t("filters.all_filters")}</span>
            <div>
              <img src={vector} />
            </div>
          </button>
          <button className="FilteredProducts-delete" onClick={clearFilters}>
            {t("filters.clear")}
          </button>
        </div>

        <div className="FilteredProducts-All-buttns">
          {selectedCatalogs.map((cat) => (
            <div key={`catalog-${cat}`} className="FilteredProducts-All-btn">
              {filterOptions?.catalogs?.find((c) => c.slug === cat)?.name || cat}
            </div>
          ))}
          {selectedCategories.map((c) => (
            <div key={`category-${c}`} className="FilteredProducts-All-btn">
              {filterOptions?.catalogs
                ?.flatMap((cat) => cat.categories || [])
                .find((cat) => cat.slug === c)?.name || c}
            </div>
          ))}
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
              {minPrice ? `${t("filters.from")} ${minPrice}` : ""}
              {minPrice && maxPrice ? " - " : ""}
              {maxPrice ? `${t("filters.to")} ${maxPrice}` : ""}
            </div>
          )}
        </div>

        {sidebarOpen && filterOptions && (
          <div className="FilterSidebar">
            <div className="FilterSidebar-header">
              <h2>{t("filters.title")}</h2>
              <button
                className="close-btn"
                onClick={() => setSidebarOpen(false)}
              >
                ×
              </button>
            </div>
            {filterOptions.catalogs?.length > 0 && (
              <div className="FilterSidebar-section">
                <h3>{t("filters.catalog")}</h3>
                <ul className="FilterSidebar-menu">
                  {filterOptions.catalogs.map((cat) => (
                    <li key={cat.slug} className="FilterSidebar-menu-item">
                      <label className="custom-checkbox-square">
                        <input
                          type="checkbox"
                          checked={selectedCatalogs.includes(cat.slug)}
                          onChange={() => {
                            setSelectedCatalogs((prev) => {
                              if (prev.includes(cat.slug)) {
                                setSelectedCategories((cats) =>
                                  cats.filter(
                                    (c) =>
                                      !cat.categories?.some((ct) => ct.slug === c)
                                  )
                                );
                                return prev.filter((c) => c !== cat.slug);
                              }
                              return [...prev, cat.slug];
                            });
                          }}
                        />
                        <span
                          className={
                            selectedCatalogs.includes(cat.slug) ? "active" : ""
                          }
                        ></span>
                      </label>
                      <span className="section-label-text">{cat.name}</span>
                    </li>
                  ))}
                </ul>
                {selectedCatalogs.map((slug) => {
                  const catalog = filterOptions.catalogs.find((c) => c.slug === slug);
                  if (!catalog?.categories?.length) return null;
                  return (
                    <ul key={`cat-${slug}`} className="FilterSidebar-menu">
                      {catalog.categories.map((c) => (
                        <li key={c.slug} className="FilterSidebar-menu-item">
                          <label className="custom-checkbox-square">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(c.slug)}
                              onChange={() =>
                                toggleItem(
                                  selectedCategories,
                                  setSelectedCategories,
                                  c.slug
                                )
                              }
                            />
                            <span
                              className={
                                selectedCategories.includes(c.slug) ? "active" : ""
                              }
                            ></span>
                          </label>
                          <span className="section-label-text">{c.name}</span>
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            )}
            {filterOptions.brands?.length > 0 && (
              <div className="FilterSidebar-section">
                <h3>{t("filters.brands")}</h3>
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
                <h3>{t("filters.color")}</h3>
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
                <h3>{t("filters.size")}</h3>
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
              <h3>{t("filters.price")}</h3>
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
              {t("filters.clear")}
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
              <p>{t("filters.no_matches")}</p>
              <p>
                {t("filters.no_results")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilteredProducts;
