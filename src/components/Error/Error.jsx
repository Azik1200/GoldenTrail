import Error from "../../assets/img/Error.svg";
import error404 from "../../assets/img/error404.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "./Error.scss";

function ErrorBlock() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="Error-Container">
      <div className="Error-Imgs">
        <div className="Error-Four">
          <img src={error404} />
        </div>
        <div className="Error">
          <img src={Error} />
        </div>
      </div>
      <h2>{t("error_page.title")}</h2>
      <p>{t("error_page.description")}</p>
      <Link to={"/"}>
        {" "}
        <button className="btn-main">{t("error_page.back_home")}</button>
      </Link>
    </div>
  );
}

export default ErrorBlock;
