import "./HeroBanner.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import heroImg from "../../assets/img/girlBaner.png";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function BanerReviews() {
  const { t } = useContext(LanguageContext);
  return (
    <>
      <div className="mainBanner__container">
        <Swiper
          modules={[Pagination]}
          pagination={{ el: ".customPagination", clickable: true }}
          loop={true}
          className="heroSwiper"
        >
          {[...Array(3)].map((_, i) => (
            <SwiperSlide key={i}>
              <div className="container">
                <div className="heroWrapper">
                  <div className="heroContent">
                    <span className="heroBadge">{t("hero.badge")}</span>
                    <h1 className="heroTitle">{t("hero.title")}</h1>
                    <p className="heroSubtitle">{t("hero.subtitle")}</p>
                    <a href="#" className="heroLink">
                      {t("hero.go_to_catalog")}
                    </a>
                  </div>
                  <div className="heroImg__wrapper">
                    <div className="heroImg">
                      <img src={heroImg} alt="Медицинская защита" />
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
