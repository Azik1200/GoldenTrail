import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Импорт модуля Autoplay

// import amazonLogo from "../../assets/img/amazon-logo.png";
import brand1 from "../../assets/img/SVG/brand1.svg";
import brand2 from "../../assets/img/SVG/brand2.svg";
import brand3 from "../../assets/img/SVG/brand3.svg";
import brand4 from "../../assets/img/SVG/brand4.svg";
import brand5 from "../../assets/img/SVG/brand5.svg";
import "swiper/css";

import "./PopularBrands.scss";
import { LanguageContext } from "../../context/LanguageContext";

const PopularBrands = () => {
  const { t } = useContext(LanguageContext);
  const data = t("popular_brands");
  return (
    <>
      <div className="container">
        <div className="PopularBrands-container">
          <div className="PopularBrands-Blocks">
            <h2 className="H2">{data.title}</h2>
            <p className="p">{data.desc}</p>
          </div>
        </div>
      </div>
      <div className="popularBrands_container">
        <Swiper
          modules={[Autoplay]} // Подключаем модуль
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={100}
          slidesPerView={5}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 100,
            },
            540: {
              slidesPerView: 3,
              spaceBetween: 100,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 100,
            },
          }}
          className="PopularBrandsSwiper"
        >
          {/* {[...Array(8)].map((_, index) => ( */}
          <SwiperSlide key="brand1">
            <div className="logo-img">
              <img src={brand1} alt="Amazon" />
            </div>
          </SwiperSlide>
          <SwiperSlide key="brand2">
            <div className="logo-img">
              <img src={brand2} alt="Amazon" />
            </div>
          </SwiperSlide>
          <SwiperSlide key="brand3">
            <div className="logo-img">
              <img src={brand3} alt="Amazon" />
            </div>
          </SwiperSlide>
          <SwiperSlide key="brand4">
            <div className="logo-img">
              <img src={brand4} alt="Amazon" />
            </div>
          </SwiperSlide>
          <SwiperSlide key="brand5">
            <div className="logo-img">
              <img src={brand5} alt="Amazon" />
            </div>
          </SwiperSlide>
          <SwiperSlide key="brand1">
            <div className="logo-img">
              <img src={brand1} alt="Amazon" />
            </div>
          </SwiperSlide>
          <SwiperSlide key="brand2">
            <div className="logo-img">
              <img src={brand2} alt="Amazon" />
            </div>
          </SwiperSlide>
          <SwiperSlide key="brand3">
            <div className="logo-img">
              <img src={brand3} alt="Amazon" />
            </div>
          </SwiperSlide>
          <SwiperSlide key="brand4">
            <div className="logo-img">
              <img src={brand4} alt="Amazon" />
            </div>
          </SwiperSlide>
          <SwiperSlide key="brand5">
            <div className="logo-img">
              <img src={brand5} alt="Amazon" />
            </div>
          </SwiperSlide>

          {/* ))} */}
        </Swiper>
      </div>
    </>
  );
};

export default PopularBrands;
