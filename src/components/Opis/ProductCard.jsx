import React, { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import BuyModal from '../../components/BuyModal/BuyModal';
import Heart from '../../assets/img/Heartb.svg';
import cart from '../../assets/img/cartb.svg';

import { LanguageContext } from '../../context/LanguageContext';

import styles from './ProductCard.module.css';
import formatPrice from '../../utils/formatPrice';

const ProductCard = ({ product }) => {
  const { t } = useContext(LanguageContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');

  useEffect(() => {
    setSelectedColor(product?.colors?.[0] || '');
    setSelectedSize(product?.sizes?.[0] || '');
  }, [product]);

  if (!product) {
    return (
      <div className={styles.ProductWrapper}>{t('product_page.product_not_selected')}</div>
    );
  }

  return (
    <div className={styles.ProductWrapper}>
      <div className={styles.productCard}>
        <div className={styles.imageSection}>
          <Swiper
            modules={[Navigation, Thumbs]}
            thumbs={{ swiper: thumbsSwiper }}
            navigation
            className={styles.mainSwiper}
          >
            {product.images?.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt={`Product ${idx}`} />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            spaceBetween={10}
            watchSlidesProgress
            className={styles.thumbSwiper}
          >
            {product.images?.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt={`Thumb ${idx}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.infoSection}>
          <h1>{product.name}</h1>
          <p className={styles.inStock}>🟢 {t('product_page.in_stock')}</p>

          {product.colors?.length > 0 && (
            <div className={styles.optionBlock}>
              <span>{t('busket.color')}:</span>
              <div className={styles.colorOptions}>
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`${styles.colorDot} ${styles[color] ?? ''} ${
                      selectedColor === color ? styles.active : ''
                    }`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className={styles.optionBlock}>
              <span>{t('busket.size')}:</span>
              <div className={styles.sizeOptions}>
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`${styles.sizeBtn} ${
                      selectedSize === size ? styles.active : ''
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.optionBlock}>
            <span>{t('busket.quantity')}:</span>
            <div className={styles.quantity}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-
              </button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className={styles.priceBlock}>
            <div className={styles.currentPrice}>{formatPrice(product.mainPrice)}</div>
            {product.oldPrice && (
              <div className={styles.oldPrice}>{formatPrice(product.oldPrice)}</div>
            )}
          </div>

          <div className={styles.btns}>
            <button
              className={styles.buyButton}
              onClick={() => setIsModalOpen(true)}
            >
              {t('products_block.buy')}
            </button>

            <button className={styles.cartBtn}>
              <img src={cart} />
            </button>
            <button className={styles.cartBtn}>
              <img src={Heart} />
            </button>
          </div>

          <p className={styles.guarantee}>✓ {t('product_page.guarantee')}</p>
        </div>
      </div>

      <h2>{t('product_page.description')}</h2>
      <div>
        <p>{product.desc}</p>
      </div>

      {isModalOpen && <BuyModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default ProductCard;
