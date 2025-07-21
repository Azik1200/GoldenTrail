import { formatImageUrl } from '../api/images';

export default function transformProduct(product) {
  const status = product.is_new
    ? 'new'
    : product.is_popular
    ? 'popular'
    : product.is_on_sale
    ? 'sale'
    : '';
  return {
    id: product.id,
    name: product.title,
    img: formatImageUrl(product.image),
    images: (product.images || []).map(formatImageUrl),
    sizes: product.sizes || [],
    colors: product.colors || [],
    brand: product.brand || product.brand_name || '',
    catalog_id: product.catalog_id,
    catalog_slug: product.catalog_slug || product.catalog,
    mainPrice: product.price,
    oldPrice: product.discount === '0.00' ? '' : product.discount,
    status,
    is_new: product.is_new,
    is_popular: product.is_popular,
    is_on_sale: product.is_on_sale,
    desc:
      product.full_description ||
      product.description ||
      product.desc ||
      '',
  };
}
