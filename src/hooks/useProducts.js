import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import transformProduct from '../utils/transformProduct';

export default function useProducts(params) {
  const [products, setProducts] = useState([]);
  const key = JSON.stringify(params);

  useEffect(() => {
    fetchProducts(params)
      .then((data) => setProducts(data.map(transformProduct)))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return products;
}
