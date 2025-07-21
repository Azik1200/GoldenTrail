import { useEffect, useState } from 'react';
import { fetchProducts, filterProducts } from '../api/products';
import transformProduct from '../utils/transformProduct';

export default function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const key = JSON.stringify(filters || {});

  useEffect(() => {
    const hasFilters = filters && Object.keys(filters).length > 0;
    const loader = hasFilters ? filterProducts(filters) : fetchProducts();
    loader
      .then((data) => setProducts(data.map(transformProduct)))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return products;
}
