import { useParams } from "react-router-dom";
import blogContent from "../../data/blogContent";

import "./BlogPage.scss";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

const BlogPage = () => {
  const { id } = useParams();
  const { t } = useContext(LanguageContext);
  const blogItem = blogContent.find((item) => item.id === parseInt(id));

  if (!blogItem) {
    return <div className="container">{t("blog.not_found")}</div>;
  }

  return (
    <div className="blogDetails">
      <div className="container">
        <h1 className="title blogDetailsTitle">{blogItem.name}</h1>
        <div className="blogDetailsImageSection">
          <div className="blogDetailsImage">
            <img src={blogItem.img} alt={blogItem.name} />
          </div>
          <div className="blogDetailsTime">{blogItem.timeForReading}</div>
        </div>
        <div className="blogDetailsContent">{blogItem.content}</div>
      </div>
    </div>
  );
};

export default BlogPage;
