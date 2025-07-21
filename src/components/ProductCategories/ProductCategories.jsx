import "./ProductCategories.scss";
import { Link } from "react-router-dom";
import person from "../../assets/img/person.png";
import bahyli from "../../assets/img/bahyli.png";
import dezenfekiciya from "../../assets/img/dezenfekciya.png";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function ProductCategories() {
  const { t } = useContext(LanguageContext);
  const categories = [
    { id: 1, slug: "xr", name: t("categories.xr"), bg: person },
    { id: 2, slug: "disposable", name: t("categories.disposable"), bg: bahyli },
    { id: 3, slug: "antiseptics", name: t("categories.antiseptics"), bg: dezenfekiciya },
  ];

  return (
    <div className="product-categories">
      <h2>{t("products_block.categories")}</h2>
      <div className="product-categories-list">
        {categories.map((category) => (
          <div
            key={category.id}
            className="product-category-card"
            style={{ backgroundImage: `url(${category.bg})` }}
          >
            <h3 className="product-category-name">{category.name}</h3>
            <Link to={`/Filter?catalog=${category.slug}`} className="btn-main btn">
              {t("busket.go_to_catalog")}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCategories;
