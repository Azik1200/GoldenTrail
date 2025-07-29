import "./HeroBanner.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import useSlides from "../../hooks/useSlides";
import { formatSlideImageUrl } from "../../api/slides";

import { Autoplay } from "swiper/modules";

function BanerReviews() {
  const { t } = useContext(LanguageContext);
  const slides = useSlides();
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
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="container">
                <div className="heroWrapper">
                  <div className="heroContent">
                    <span className="heroBadge">{slide.small_text}</span>
                    <h1 className="heroTitle">{slide.big_text}</h1>
                    <p className="heroSubtitle">{slide.medium_text}</p>
                    <Link to="/Filter" className="heroLink">
                      {t("hero.go_to_catalog")}
                    </Link>
                  </div>
                  <div className="heroImg__wrapper">
                    <div className="heroImg">
                      <img
                        src={formatSlideImageUrl(slide.image)}
                        alt={slide.big_text}
                      />
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
