import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "./../../assets/img/Logo.svg";
import { fetchCatalogs } from "../../api/catalogs";
import useProducts from "../../hooks/useProducts";
import { setCurrentProduct } from "../../redux/CurrentProductSlice";
import formatPrice from "../../utils/formatPrice";
import { LanguageContext } from "../../context/LanguageContext";
import "./HeaderNew.scss";

const HeaderNew = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState(() => {
    const stored = localStorage.getItem("searchHistory");
    return stored ? JSON.parse(stored) : [];
  });
  const products = useProducts();
  const dispatch = useDispatch();
  const { language, setLanguage, t } = useContext(LanguageContext);

  useEffect(() => {
    const body = document.body;
    const dropdown = document.querySelector(".headerDropdownDesktop");

    if (isHovered) {
      body.classList.add("active");
      dropdown?.classList.add("opened");
    } else {
      body.classList.remove("active");
      dropdown?.classList.remove("opened");
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsSearchOpen(false);
    setIsHovered(true);
  };
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    fetchCatalogs()
      .then((data) => {
        setCatalogs(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (catalogs.length && !activeTab) {
      setActiveTab(`cat-${catalogs[0].id}`);
    }
  }, [catalogs, activeTab]);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    setSearchResults(products.filter((p) => p.name.toLowerCase().includes(q)));
  }, [searchQuery, products]);

  const addToHistory = (query) => {
    if (!query.trim()) return;
    setSearchHistory((prev) => {
      const newHistory = [query, ...prev.filter((q) => q !== query)].slice(0, 5);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const removeFromHistory = (query) => {
    setSearchHistory((prev) => {
      const newHistory = prev.filter((q) => q !== query);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  useEffect(() => {
    const burger = document.getElementById("burgerID");
    const body = document.body;
    const dropdownMobile = document.querySelector(".headerDropdownMobile");
    const mobileAccordionBtn = document.querySelector(
      ".headerDropdownMobile_item_main-btn"
    );
    const accordionContent = document.querySelector(
      ".headerDropdownMobile_item_content"
    );
    const contentBtns = document.querySelectorAll(
      ".headerDropdownMobile_item_content_btn"
    );
    const secondWrappers = document.querySelectorAll(
      ".headerDropdownMobile_wrapper_second-inner"
    );
    const backBtns = document.querySelectorAll("#headerGOBACK");

    const toggleBurger = () => {
      burger.classList.toggle("burgerOPEN");
      dropdownMobile.classList.toggle("active");
      dropdownMobile.classList.remove("second-view");
      dropdownMobile.classList.add("main-view");
      body.classList.toggle("active");
    };

    const closeBurger = (e) => {
      if (e.target.classList.contains("burgerOPEN")) {
        burger.classList.remove("burgerOPEN");
        dropdownMobile.classList.remove("active", "main-view", "second-view");
        body.classList.remove("active");
      }
    };

    const toggleAccordion = () => {
      accordionContent.classList.toggle("open");
    };

    const openSecondView = (id) => {
      secondWrappers.forEach((el) => {
        el.style.display = el.getAttribute("data-id") === id ? "block" : "none";
      });
      dropdownMobile.classList.remove("main-view");
      dropdownMobile.classList.add("second-view");
    };

    const backToMain = () => {
      dropdownMobile.classList.remove("second-view");
      dropdownMobile.classList.add("main-view");
    };

    burger?.addEventListener("click", toggleBurger);
    document.addEventListener("click", closeBurger);
    mobileAccordionBtn?.addEventListener("click", toggleAccordion);
    contentBtns.forEach((btn) => {
      btn.addEventListener("click", () => openSecondView(btn.id));
    });
    backBtns.forEach((btn) => {
      btn.addEventListener("click", backToMain);
    });

    return () => {
      burger?.removeEventListener("click", toggleBurger);
      document.removeEventListener("click", closeBurger);
      mobileAccordionBtn?.removeEventListener("click", toggleAccordion);
      contentBtns.forEach((btn) => {
        btn.removeEventListener("click", () => openSecondView(btn.id));
      });
      backBtns.forEach((btn) => {
        btn.removeEventListener("click", backToMain);
      });
    };
  }, [catalogs]);

  return (
    <>
      <div className="headerMain">
        <div className="headerNew">
          <div className="container">
            <div className="headerNew_wrapper">
              <div className="headerNew_logo">
                <img src={logo} alt="GoldenTrail" />
              </div>
              <div className="headerNew_nav">
                <button
                  className="headerNew_nav_btn"
                  id="headerNewProduction"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {t("header.products")}
                </button>
                <a href="#" className="headerNew_nav_btn">
                  {t("header.about")}
                </a>
                <button className="headerNew_nav_btn">{t("header.contacts")}</button>
              </div>
              <div className="headerNew_functions">
                <button
                  className="headerNew_functions_btn"
                  id="openSearchPanelDesctop"
                  onClick={() => {
                    setIsSearchOpen((prev) => !prev);
                    setIsHovered(false);
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4546 15.4546L19.0909 19.0909M2.72729 10C2.72729 11.9289 3.49353 13.7787 4.85743 15.1426C6.22133 16.5065 8.07118 17.2728 10 17.2728C11.9289 17.2728 13.7787 16.5065 15.1426 15.1426C16.5065 13.7787 17.2728 11.9289 17.2728 10C17.2728 8.07118 16.5065 6.22133 15.1426 4.85743C13.7787 3.49353 11.9289 2.72729 10 2.72729C8.07118 2.72729 6.22133 3.49353 4.85743 4.85743C3.49353 6.22133 2.72729 8.07118 2.72729 10Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <a href="#" className="headerNew_functions_btn">
                  <svg
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.2864 3.47729C16.5056 3.47729 18.2991 5.29843 18.2991 7.72729C18.2991 9.20607 17.6703 10.6051 16.428 12.2009C15.1765 13.8085 13.3727 15.5297 11.1292 17.6658L11.1282 17.6667L10.3899 18.3708L9.65356 17.6667L9.65259 17.6658L8.05396 16.1365C6.54166 14.6759 5.29231 13.4066 4.35376 12.2009C3.11147 10.6051 2.48267 9.20607 2.48267 7.72729C2.48267 5.2985 4.27521 3.4774 6.49438 3.47729C7.76009 3.47729 8.99836 4.09996 9.80981 5.09253L10.3909 5.80347L10.9709 5.09253C11.7823 4.09991 13.0207 3.47743 14.2864 3.47729Z"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  </svg>
                </a>
                <a href="#" className="headerNew_functions_btn">
                  <svg
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.4415 18.4091C8.4415 18.6788 8.36533 18.9425 8.22263 19.1667C8.07993 19.391 7.8771 19.5657 7.63979 19.6689C7.40248 19.7722 7.14136 19.7992 6.88943 19.7465C6.63751 19.6939 6.4061 19.5641 6.22448 19.3733C6.04285 19.1826 5.91916 18.9397 5.86905 18.6751C5.81894 18.4106 5.84466 18.1364 5.94295 17.8873C6.04125 17.6381 6.20771 17.4251 6.42128 17.2753C6.63485 17.1255 6.88594 17.0455 7.1428 17.0455C7.48724 17.0455 7.81756 17.1891 8.06112 17.4449C8.30467 17.7006 8.4415 18.0475 8.4415 18.4091ZM15.5844 17.0455C15.3275 17.0455 15.0764 17.1255 14.8628 17.2753C14.6493 17.4251 14.4828 17.6381 14.3845 17.8873C14.2862 18.1364 14.2605 18.4106 14.3106 18.6751C14.3607 18.9397 14.4844 19.1826 14.666 19.3733C14.8477 19.5641 15.0791 19.6939 15.331 19.7465C15.5829 19.7992 15.844 19.7722 16.0813 19.6689C16.3187 19.5657 16.5215 19.391 16.6642 19.1667C16.8069 18.9425 16.8831 18.6788 16.8831 18.4091C16.8831 18.0475 16.7462 17.7006 16.5027 17.4449C16.2591 17.1891 15.9288 17.0455 15.5844 17.0455ZM19.4569 6.31877L17.3758 14.1835C17.2613 14.6132 17.0166 14.9919 16.6787 15.2623C16.3407 15.5327 15.928 15.68 15.5032 15.6818H7.48046C7.05435 15.6816 6.64 15.5351 6.30059 15.2646C5.96118 14.9941 5.71535 14.6144 5.60059 14.1835L2.75319 3.40911H1.29864C1.12642 3.40911 0.961259 3.33727 0.839482 3.20941C0.717705 3.08154 0.649292 2.90812 0.649292 2.72729C0.649292 2.54646 0.717705 2.37304 0.839482 2.24517C0.961259 2.11731 1.12642 2.04547 1.29864 2.04547H3.24669C3.38866 2.04544 3.52672 2.09427 3.63975 2.18447C3.75277 2.27466 3.83453 2.40127 3.87251 2.5449L4.64199 5.45456H18.8311C18.9312 5.45454 19.03 5.47882 19.1197 5.52551C19.2094 5.5722 19.2875 5.64003 19.3481 5.7237C19.4087 5.80737 19.4501 5.90462 19.4689 6.00785C19.4878 6.11108 19.4837 6.21749 19.4569 6.31877ZM17.9764 6.8182H5.00319L6.85465 13.8188C6.89262 13.9624 6.97438 14.089 7.08741 14.1792C7.20043 14.2694 7.3385 14.3182 7.48046 14.3182H15.5032C15.6452 14.3182 15.7832 14.2694 15.8962 14.1792C16.0093 14.089 16.091 13.9624 16.129 13.8188L17.9764 6.8182Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a href="#" className="headerNew_functions_btn">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    _
                    <path
                      d="M19.681 18.0683C18.383 15.8242 16.3827 14.2151 14.0483 13.4524C15.203 12.765 16.1001 11.7175 16.6019 10.4709C17.1037 9.22432 17.1824 7.84747 16.8259 6.5518C16.4695 5.25614 15.6976 4.11331 14.6287 3.29882C13.5599 2.48433 12.2532 2.04321 10.9094 2.04321C9.56562 2.04321 8.25896 2.48433 7.19012 3.29882C6.12129 4.11331 5.34936 5.25614 4.99289 6.5518C4.63643 7.84747 4.71513 9.22432 5.21691 10.4709C5.71869 11.7175 6.61581 12.765 7.7705 13.4524C5.43613 14.2143 3.43584 15.8234 2.13783 18.0683C2.09023 18.1459 2.05866 18.2322 2.04497 18.3223C2.03129 18.4123 2.03578 18.5041 2.05816 18.5924C2.08055 18.6806 2.12039 18.7635 2.17532 18.8361C2.23026 18.9087 2.29918 18.9696 2.37802 19.0151C2.45686 19.0607 2.54403 19.0899 2.63437 19.1013C2.72472 19.1126 2.81641 19.1057 2.90404 19.081C2.99168 19.0563 3.07347 19.0142 3.14461 18.9574C3.21575 18.9006 3.27478 18.8301 3.31823 18.7501C4.92391 15.9751 7.76198 14.3183 10.9094 14.3183C14.0569 14.3183 16.8949 15.9751 18.5006 18.7501C18.5441 18.8301 18.6031 18.9006 18.6742 18.9574C18.7454 19.0142 18.8272 19.0563 18.9148 19.081C19.0024 19.1057 19.0941 19.1126 19.1845 19.1013C19.2748 19.0899 19.362 19.0607 19.4408 19.0151C19.5197 18.9696 19.5886 18.9087 19.6435 18.8361C19.6985 18.7635 19.7383 18.6806 19.7607 18.5924C19.7831 18.5041 19.7875 18.4123 19.7739 18.3223C19.7602 18.2322 19.7286 18.1459 19.681 18.0683ZM6.13669 8.1819C6.13669 7.23794 6.41661 6.31518 6.94104 5.53031C7.46548 4.74544 8.21088 4.13371 9.08298 3.77247C9.95508 3.41123 10.9147 3.31672 11.8405 3.50087C12.7664 3.68503 13.6168 4.13959 14.2842 4.80707C14.9517 5.47455 15.4063 6.32496 15.5904 7.25078C15.7746 8.1766 15.6801 9.13624 15.3188 10.0083C14.9576 10.8804 14.3459 11.6258 13.561 12.1503C12.7761 12.6747 11.8534 12.9546 10.9094 12.9546C9.64403 12.9533 8.43086 12.45 7.53609 11.5552C6.64132 10.6605 6.13805 9.44729 6.13669 8.1819Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
              <div className="headerNew_right">
                <div className="headerNew_languages">
                  <button
                    onClick={() => setLanguage("az")}
                    className={`headerNew_languages_btn ${language === "az" ? "active" : ""}`}
                  >
                    AZ
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`headerNew_languages_btn ${language === "en" ? "active" : ""}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("ru")}
                    className={`headerNew_languages_btn ${language === "ru" ? "active" : ""}`}
                  >
                    RU
                  </button>
                </div>
                <button className="headerNew_right_burger" id="burgerID">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="headerDropdownDesktop"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container">
            <div className="headerDropdownDesktop_wrapper">
              <div className="headerDropdownDesktop_chapter">
                {catalogs.map((cat) => (
                  <div
                    key={cat.id}
                    className={`headerDropdownDesktop_chapter_item ${
                      activeTab === `cat-${cat.id}` ? "active" : ""
                    }`}
                    id={`cat-${cat.id}`}
                    onClick={() => setActiveTab(`cat-${cat.id}`)}
                  >
                    {cat.name || cat.slug}
                  </div>
                ))}
              </div>

              <div className="headerDropdownDesktop_categories">
                {catalogs.map((cat) => (
                  activeTab === `cat-${cat.id}` && (
                    <ul
                      key={cat.id}
                      className="headerDropdownDesktop_categories_list"
                    >
                      {cat.categories?.map((c) => (
                        <li
                          key={c.id}
                          className="headerDropdownDesktop_categories_item"
                        >
                          <a href="#">{c.name || c.slug}</a>
                        </li>
                      ))}
                    </ul>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="headerDropdownMobile">
          <div className="container">
            <div className="headerDropdownMobile_wrapper_main">
              <div className="headerDropdownMobile_item">
                <div className="headerDropdownMobile_item_main-btn production">
                  Продукция
                </div>
                <div className="headerDropdownMobile_item_content">
                  {catalogs.map((cat) => (
                    <div
                      key={cat.id}
                      className="headerDropdownMobile_item_content_btn"
                      id={`cat-mob-${cat.id}`}
                    >
                      {cat.name || cat.slug}
                    </div>
                  ))}
                </div>
              </div>
              <div className="headerDropdownMobile_item">О нас</div>
              <div className="headerDropdownMobile_item">Контакты</div>
            </div>
            <div className="headerDropdownMobile_wrapper_second">
              {catalogs.map((cat) => (
                <div
                  key={cat.id}
                  className="headerDropdownMobile_wrapper_second-inner"
                  data-id={`cat-mob-${cat.id}`}
                >
                  <button
                    className="headerDropdownMobile_wrapper_second-back"
                    id="headerGOBACK"
                  >
                    Назад
                  </button>
                  <div className="headerDropdownMobile_wrapper_second-inner-innerest">
                    <div className="headerDropdownMobile_wrapper_second-inner_name">
                      {cat.name || cat.slug}
                    </div>
                    <ul className="headerDropdownMobile_wrapper_second-inner-list">
                      {cat.categories?.map((c) => (
                        <li
                          key={c.id}
                          className="headerDropdownMobile_wrapper_second-inner-list-item"
                        >
                          <a href="#">{c.name || c.slug}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isSearchOpen && (
        <div className="headerSearch">
          <div className="container">
            <div className="headerWrapper">
              <form action="#" id="headerNewFormSearch">
                <input
                  type="text"
                  className="headerNewSearchInput"
                  name="search"
                  id="headerNewSearchInput"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <button
                className="headerNewCloseBtn"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          <div className="headerResults">
            <div className="container">
              <div className="headerResultsWrapper">
                {searchResults.length > 0 ? (
                  <div className="headerResultsPlus">
                    <ul className="headerResultsList">
                      {searchResults.map((product) => (
                        <li key={product.id} className="headerResultsListItem">
                          <Link
                            to={`/desc/${product.id}`}
                            onClick={() => {
                              dispatch(setCurrentProduct(product));
                              addToHistory(searchQuery);
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <div className="headerResultsListItem_wrapper">
                              <div className="headerResultsListItem_img">
                                <img src={product.img} alt={product.name} />
                              </div>
                              <div className="headerResultsListItem_wrapper-inner">
                                <div className="headerResultsListItem_name">
                                  {product.name}
                                </div>
                                <div className="headerResultsListItem_price">
                                  <div className="headerResultsListItem_price-actual">
                                    {formatPrice(product.mainPrice)}
                                  </div>
                                  {product.oldPrice && (
                                    <div className="headerResultsListItem_price-old">
                                      {formatPrice(product.oldPrice)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : searchQuery ? (
                  <div className="headerResultsMinus">
                    <p className="headerNewSearchResultsMinus">
                      По вашему запросу ничего не найдено
                    </p>
                  </div>
                ) : (
                  searchHistory.length > 0 && (
                    <div className="headerResultsStory">
                      <ul className="headerResultsStoryList">
                        {searchHistory.map((item) => (
                          <li key={item} className="headerResultsStoryListItem">
                            <div
                              className="headerResultsStoryListItemName"
                              onClick={() => setSearchQuery(item)}
                            >
                              {item}
                            </div>
                            <button
                              className="headerResultsStoryListItemBtn"
                              onClick={() => removeFromHistory(item)}
                            >
                              Удалить
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
      <div className="headerFunctionsMobile">
        <div className="container">
          <div className="headerFunctionsMobileWrapper">
            <button
              className="headerNew_functions_btn"
              id="openSearchPanelMobile"
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4546 15.4546L19.0909 19.0909M2.72729 10C2.72729 11.9289 3.49353 13.7787 4.85743 15.1426C6.22133 16.5065 8.07118 17.2728 10 17.2728C11.9289 17.2728 13.7787 16.5065 15.1426 15.1426C16.5065 13.7787 17.2728 11.9289 17.2728 10C17.2728 8.07118 16.5065 6.22133 15.1426 4.85743C13.7787 3.49353 11.9289 2.72729 10 2.72729C8.07118 2.72729 6.22133 3.49353 4.85743 4.85743C3.49353 6.22133 2.72729 8.07118 2.72729 10Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <a href="#" className="headerNew_functions_btn">
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2864 3.47729C16.5056 3.47729 18.2991 5.29843 18.2991 7.72729C18.2991 9.20607 17.6703 10.6051 16.428 12.2009C15.1765 13.8085 13.3727 15.5297 11.1292 17.6658L11.1282 17.6667L10.3899 18.3708L9.65356 17.6667L9.65259 17.6658L8.05396 16.1365C6.54166 14.6759 5.29231 13.4066 4.35376 12.2009C3.11147 10.6051 2.48267 9.20607 2.48267 7.72729C2.48267 5.2985 4.27521 3.4774 6.49438 3.47729C7.76009 3.47729 8.99836 4.09996 9.80981 5.09253L10.3909 5.80347L10.9709 5.09253C11.7823 4.09991 13.0207 3.47743 14.2864 3.47729Z"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
            <a href="#" className="headerNew_functions_btn">
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.4415 18.4091C8.4415 18.6788 8.36533 18.9425 8.22263 19.1667C8.07993 19.391 7.8771 19.5657 7.63979 19.6689C7.40248 19.7722 7.14136 19.7992 6.88943 19.7465C6.63751 19.6939 6.4061 19.5641 6.22448 19.3733C6.04285 19.1826 5.91916 18.9397 5.86905 18.6751C5.81894 18.4106 5.84466 18.1364 5.94295 17.8873C6.04125 17.6381 6.20771 17.4251 6.42128 17.2753C6.63485 17.1255 6.88594 17.0455 7.1428 17.0455C7.48724 17.0455 7.81756 17.1891 8.06112 17.4449C8.30467 17.7006 8.4415 18.0475 8.4415 18.4091ZM15.5844 17.0455C15.3275 17.0455 15.0764 17.1255 14.8628 17.2753C14.6493 17.4251 14.4828 17.6381 14.3845 17.8873C14.2862 18.1364 14.2605 18.4106 14.3106 18.6751C14.3607 18.9397 14.4844 19.1826 14.666 19.3733C14.8477 19.5641 15.0791 19.6939 15.331 19.7465C15.5829 19.7992 15.844 19.7722 16.0813 19.6689C16.3187 19.5657 16.5215 19.391 16.6642 19.1667C16.8069 18.9425 16.8831 18.6788 16.8831 18.4091C16.8831 18.0475 16.7462 17.7006 16.5027 17.4449C16.2591 17.1891 15.9288 17.0455 15.5844 17.0455ZM19.4569 6.31877L17.3758 14.1835C17.2613 14.6132 17.0166 14.9919 16.6787 15.2623C16.3407 15.5327 15.928 15.68 15.5032 15.6818H7.48046C7.05435 15.6816 6.64 15.5351 6.30059 15.2646C5.96118 14.9941 5.71535 14.6144 5.60059 14.1835L2.75319 3.40911H1.29864C1.12642 3.40911 0.961259 3.33727 0.839482 3.20941C0.717705 3.08154 0.649292 2.90812 0.649292 2.72729C0.649292 2.54646 0.717705 2.37304 0.839482 2.24517C0.961259 2.11731 1.12642 2.04547 1.29864 2.04547H3.24669C3.38866 2.04544 3.52672 2.09427 3.63975 2.18447C3.75277 2.27466 3.83453 2.40127 3.87251 2.5449L4.64199 5.45456H18.8311C18.9312 5.45454 19.03 5.47882 19.1197 5.52551C19.2094 5.5722 19.2875 5.64003 19.3481 5.7237C19.4087 5.80737 19.4501 5.90462 19.4689 6.00785C19.4878 6.11108 19.4837 6.21749 19.4569 6.31877ZM17.9764 6.8182H5.00319L6.85465 13.8188C6.89262 13.9624 6.97438 14.089 7.08741 14.1792C7.20043 14.2694 7.3385 14.3182 7.48046 14.3182H15.5032C15.6452 14.3182 15.7832 14.2694 15.8962 14.1792C16.0093 14.089 16.091 13.9624 16.129 13.8188L17.9764 6.8182Z"
                  fill="white"
                />
              </svg>
            </a>
            <a href="#" className="headerNew_functions_btn">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                _
                <path
                  d="M19.681 18.0683C18.383 15.8242 16.3827 14.2151 14.0483 13.4524C15.203 12.765 16.1001 11.7175 16.6019 10.4709C17.1037 9.22432 17.1824 7.84747 16.8259 6.5518C16.4695 5.25614 15.6976 4.11331 14.6287 3.29882C13.5599 2.48433 12.2532 2.04321 10.9094 2.04321C9.56562 2.04321 8.25896 2.48433 7.19012 3.29882C6.12129 4.11331 5.34936 5.25614 4.99289 6.5518C4.63643 7.84747 4.71513 9.22432 5.21691 10.4709C5.71869 11.7175 6.61581 12.765 7.7705 13.4524C5.43613 14.2143 3.43584 15.8234 2.13783 18.0683C2.09023 18.1459 2.05866 18.2322 2.04497 18.3223C2.03129 18.4123 2.03578 18.5041 2.05816 18.5924C2.08055 18.6806 2.12039 18.7635 2.17532 18.8361C2.23026 18.9087 2.29918 18.9696 2.37802 19.0151C2.45686 19.0607 2.54403 19.0899 2.63437 19.1013C2.72472 19.1126 2.81641 19.1057 2.90404 19.081C2.99168 19.0563 3.07347 19.0142 3.14461 18.9574C3.21575 18.9006 3.27478 18.8301 3.31823 18.7501C4.92391 15.9751 7.76198 14.3183 10.9094 14.3183C14.0569 14.3183 16.8949 15.9751 18.5006 18.7501C18.5441 18.8301 18.6031 18.9006 18.6742 18.9574C18.7454 19.0142 18.8272 19.0563 18.9148 19.081C19.0024 19.1057 19.0941 19.1126 19.1845 19.1013C19.2748 19.0899 19.362 19.0607 19.4408 19.0151C19.5197 18.9696 19.5886 18.9087 19.6435 18.8361C19.6985 18.7635 19.7383 18.6806 19.7607 18.5924C19.7831 18.5041 19.7875 18.4123 19.7739 18.3223C19.7602 18.2322 19.7286 18.1459 19.681 18.0683ZM6.13669 8.1819C6.13669 7.23794 6.41661 6.31518 6.94104 5.53031C7.46548 4.74544 8.21088 4.13371 9.08298 3.77247C9.95508 3.41123 10.9147 3.31672 11.8405 3.50087C12.7664 3.68503 13.6168 4.13959 14.2842 4.80707C14.9517 5.47455 15.4063 6.32496 15.5904 7.25078C15.7746 8.1766 15.6801 9.13624 15.3188 10.0083C14.9576 10.8804 14.3459 11.6258 13.561 12.1503C12.7761 12.6747 11.8534 12.9546 10.9094 12.9546C9.64403 12.9533 8.43086 12.45 7.53609 11.5552C6.64132 10.6605 6.13805 9.44729 6.13669 8.1819Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNew;
