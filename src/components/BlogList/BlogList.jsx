import "./BlogList.scss";

import React, { useContext, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchBlogs } from "../../api/blogs";
import { formatSlideImageUrl } from "../../api/slides";

const BlogList = () => {
  const { t } = useContext(LanguageContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        if (Array.isArray(data)) setBlogs(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadBlogs();
  }, []);

  return (
    <>
      <div className="blogListSection">
        <div className="container">
          <h2 className="h2 blogListH2">{t("blog.title")}</h2>
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
              {blogs.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="blogItemWrapper">
                    <div className="blogItemTop">
                      <div className="blogItemImg">
                        <img
                          src={formatSlideImageUrl(item.image)}
                          alt={item.title}
                        />
                      </div>
                      <div className="blogItemReadingTime">
                        {item.reading_time} мин
                      </div>
                    </div>
                    <div className="blogItemBottom">
                      <h3 className="blogItemName">{item.title}</h3>
                      <Link to={`/blog/${item.slug}`} className="blogItemLink">
                        {t("blog.read")}
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
