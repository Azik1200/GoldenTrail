import { useParams } from "react-router-dom";

import "./BlogPage.scss";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchBlog } from "../../api/blogs";
import { formatSlideImageUrl } from "../../api/slides";

const BlogPage = () => {
  const { slug } = useParams();
  const { t } = useContext(LanguageContext);
  const [blogItem, setBlogItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await fetchBlog(slug);
        setBlogItem(data);
      } catch (err) {
        console.error(err);
        setBlogItem(null);
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [slug]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!blogItem) {
    return <div className="container">{t("blog.not_found")}</div>;
  }

  return (
    <div className="blogDetails">
      <div className="container">
        <h1 className="title blogDetailsTitle">{blogItem.title}</h1>
        <div className="blogDetailsImageSection">
          <div className="blogDetailsImage">
            <img
              src={formatSlideImageUrl(blogItem.image)}
              alt={blogItem.title}
            />
          </div>
          <div className="blogDetailsTime">{blogItem.reading_time} мин</div>
        </div>
        <div className="blogDetailsContent">{blogItem.text}</div>
      </div>
    </div>
  );
};

export default BlogPage;
