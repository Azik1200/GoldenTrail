import "./BlogList.scss";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import blogContent from "../../data/blogContent";

import { Link } from "react-router-dom";

const BlogList = () => {
  return (
    <>
      <div className="blogListSection">
        <div className="container">
          <h2 className="h2 blogListH2">Блог</h2>
          <div className="blogListWrapper">
            <Swiper
              className="BlogSwiper"
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
              {blogContent.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="blogItemWrapper">
                    <div className="blogItemTop">
                      <div className="blogItemImg">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="blogItemReadingTime">
                        {item.timeForReading}
                      </div>
                    </div>
                    <div className="blogItemBottom">
                      <h3 className="blogItemName">{item.name}</h3>
                      <Link to={`/blog/${item.id}`} className="blogItemLink">
                        Читать
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;
