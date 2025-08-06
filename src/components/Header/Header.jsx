import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import logo from "../../assets/img/Logo.svg";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchCategories } from "../../api/categories";
import useProducts from "../../hooks/useProducts";
import { useDispatch } from "react-redux";
import { setCurrentProduct } from "../../redux/CurrentProductSlice";
import "./Header.scss";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchOpenProducts, setIsSearchOpenProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const products = useProducts();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, [language]);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    setSearchResults(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku?.toString().toLowerCase().includes(q)
      )
    );
  }, [searchQuery, products]);

  return (
    <header className="header">
      <div className="header-main">
        <div className="container header-main__wrapper">
          <Link className="header-main__logo" to="/">
            <img src={logo} alt="Golden Trail" />
          </Link>
          <nav className={`header-main__nav ${menuOpen ? "open" : ""}`}>
            <button
              className="header-main__link"
              onClick={() => setIsSearchOpenProducts(!isSearchOpenProducts)}
            >
              {t("header.products")}
            </button>

            <Link to="/about" className="header-main__link">
              {t("header.about")}
            </Link>
            <a href="#" className="header-main__link">
              {t("header.contacts")}
            </a>
          </nav>
          <div className="header-main__actions">
            <button
              className="icon-btn"
              aria-label={t("header.search")}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FiSearch />
            </button>

            <Link
              to="/favorites"
              className="icon-btn"
              aria-label={t("header.favorites")}
            >
              <FiHeart />
            </Link>
            <Link
              to="/busket"
              className="icon-btn"
              aria-label={t("header.cart")}
            >
              <FiShoppingCart />
            </Link>
            <Link
              to="/LR"
              className="icon-btn"
              aria-label={t("header.account")}
            >
              <FiUser />
            </Link>
          </div>
          <div className="header-main__right">
            <div className="header-main__language">
              <button
                onClick={() => setLanguage("az")}
                className={language === "az" ? "active" : ""}
              >
                AZ
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={language === "en" ? "active" : ""}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ru")}
                className={language === "ru" ? "active" : ""}
              >
                RU
              </button>
            </div>
            <button
              className="header-main__burger"
              aria-label={t("header.menu")}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="search">
          <div className="searchContainer container">
            <div className="searchBox">
              <input
                type="text"
                placeholder={t("header.search")}
                className="searchInput"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="searchClose"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                aria-label={t("common.close")}
              >
                ×
              </button>
            </div>
            {searchResults.length > 0 && (
              <ul className="searchResults">
                {searchResults.map((product) => (
                  <li key={product.id} className="searchResultItem">
                    <Link
                      to={`/desc/${product.id}`}
                      onClick={() => {
                        dispatch(setCurrentProduct(product));
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {isSearchOpenProducts && (
        <div className="productsDropdown-wrapper">
          <div className="productsDropdown ">
            <div className="productsDropdown-block">
              <div className="productsDropdownInner ">
                <div className="h2-title">
                  {categories.map((cat) => (
                    <div key={cat.id} className="title">
                      {cat.name}
                    </div>
                  ))}
                </div>
                {categories.map((cat) => (
                  <ul key={cat.id} className="productsDropdownInner-menu">
                    {cat.children?.map((child) => (
                      <li key={child.id} className="productsDropdownInner-menu-item">
                        {child.name || child.slug}
                      </li>
                    ))}
                  </ul>
                ))}
                <button
                  className="searchClose"
                  onClick={() => setIsSearchOpenProducts(false)}
                  aria-label={t("common.close")}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
