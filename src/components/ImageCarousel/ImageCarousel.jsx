import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./ImageCarousel.module.css";

/**
 * ImageCarousel waits for an array of image urls and initializes Swiper
 * only after the data is loaded. The observer options ensure correct
 * size calculation when the carousel appears in dynamically changing layouts.
 */
function ImageCarousel({ images }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      setReady(true);
    }
  }, [images]);

  if (!ready) return null; // render nothing until images available

  return (
    <Swiper observer observeParents className={styles.carousel}>
      {images.map((src, idx) => (
        <SwiperSlide key={idx} className={styles.slide}>
          <img src={src} alt="Slide" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageCarousel;
