import "./About.scss";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import AboutPic from "./../../assets/img/about-us.png";

function About() {
  const { t } = useContext(LanguageContext);
  const texts = t("about_section");

  return (
    <div className="container-About">
      <h2>{texts.title}</h2>
      <div className="about-block">
        <div className="About-Info">
          <div className="About-Descs">
            <p>{texts.desc1}</p>
            <p>{texts.desc2}</p>
            <p>{texts.desc3}</p>
          </div>
          <button className="btn-main">{texts.button}</button>
        </div>
        <div className="AboutPic-img">
          <img src={AboutPic} />
        </div>
      </div>
    </div>
  );
}

export default About;
