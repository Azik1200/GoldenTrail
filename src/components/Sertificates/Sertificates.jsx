import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./Sertificates.scss";

import sert1 from "./../../assets/img/1x/SERTIFICATE-8714.png";
import sert2 from "./../../assets/img/1x/SERTIFICATE-8715.png";
import sert3 from "./../../assets/img/1x/SERTIFICATE-8716.png";

import sertDownload1 from "./../../assets/img/PDF/SERTIFICATE-8714.pdf";
import sertDownload2 from "./../../assets/img/PDF/SERTIFICATE-8715.pdf";
import sertDownload3 from "./../../assets/img/PDF/SERTIFICATE-8716.pdf";

const Sertificates = () => {
  return (
    <>
      <div className="SertificatesSection">
        <div className="container">
          <h2 className="h2 sertificatesH2">Наши сертификаты</h2>
          <Swiper
            className="SertsSwiper"
            spaceBetween={16}
            breakpoints={{
              0: {
                slidesPerView: 1.4,
              },
              541: {
                slidesPerView: 2.5,
              },
              769: {
                slidesPerView: 3,
              },
            }}
          >
            <SwiperSlide>
              <div className="swiperSlideSertWrapper">
                <div className="downloadSert">
                  <a
                    href={sertDownload1}
                    download={sertDownload1}
                    className="downloadSertLink"
                  >
                    Скачать сертификат
                  </a>
                </div>
                <div className="sertImg">
                  <img src={sert1} alt="Sert1" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiperSlideSertWrapper">
                <div className="downloadSert">
                  <a
                    href={sertDownload2}
                    download={sertDownload2}
                    className="downloadSertLink"
                  >
                    Скачать сертификат
                  </a>
                </div>
                <div className="sertImg">
                  <img src={sert2} alt="Sert2" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiperSlideSertWrapper">
                <div className="downloadSert">
                  <a
                    href={sertDownload3}
                    download={sertDownload3}
                    className="downloadSertLink"
                  >
                    Скачать сертификат
                  </a>
                </div>
                <div className="sertImg">
                  <img src={sert3} alt="Sert3" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Sertificates;
