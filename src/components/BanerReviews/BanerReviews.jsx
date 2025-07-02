import "./HeroBanner.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import slideContent from "../../data/slidesContent";

import { Autoplay } from "swiper/modules";

function BanerReviews() {
  const { t } = useContext(LanguageContext);
  return (
    <>
      <div className="mainBanner__container">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ el: ".customPagination", clickable: true }}
          loop={true}
          className="heroSwiper"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {slideContent.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="container">
                <div className="heroWrapper">
                  <div className="heroContent">
                    <span className="heroBadge">{slide.badge}</span>
                    <h1 className="heroTitle">{slide.title}</h1>
                    <p className="heroSubtitle">{slide.subtitle}</p>
                    <a href={slide.link} className="heroLink">
                      {t("hero.go_to_catalog")}
                    </a>
                  </div>
                  <div className="heroImg__wrapper">
                    <div className="heroImg">
                      <img src={slide.image} alt={slide.title} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="container">
            <div className="customPagination" />
          </div>
        </Swiper>
      </div>
    </>
  );
}

export default BanerReviews;
