import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import ProductCard from "../../components/Opis/ProductCard";
import { setCurrentProduct } from "../../redux/CurrentProductSlice";
import { fetchProduct } from "../../api/products";
import transformProduct from "../../utils/transformProduct";
import { LanguageContext } from "../../context/LanguageContext";

function Desc() {
  const { t } = useContext(LanguageContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.currentProduct.product);

  useEffect(() => {
    if (!product || product.id !== Number(id) || !product.images?.length) {
      fetchProduct(id)
        .then((data) => dispatch(setCurrentProduct(transformProduct(data))))
        .catch((err) => console.error(err));
    }
  }, [id, dispatch, product]);

  if (!product || product.id !== Number(id)) {
    return <div>{t('product_page.loading')}</div>;
  }

  return <ProductCard product={product} />;
}

export default Desc;
