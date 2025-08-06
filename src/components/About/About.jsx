import "./About.scss";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchAbout } from "../../api/about";
import { formatSlideImageUrl } from "../../api/slides";

function About() {
  const { t, language } = useContext(LanguageContext);
  const texts = t("about_section");
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetchAbout()
      .then((data) => setAbout(data))
      .catch((err) => console.error(err));
  }, [language]);

  const paragraphs = about?.text ? about.text.split("\n\n") : [];

  return (
    <div className="container-About">
      <h2>{texts.title}</h2>
      <div className="about-block">
        <div className="About-Info">
          <div className="About-Descs">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
          <button className="btn-main">{texts.button}</button>
        </div>
        <div className="AboutPic-img">
          {about && (
            <img src={formatSlideImageUrl(about.image)} alt={texts.title} />
          )}
        </div>
      </div>
    </div>
  );
}

export default About;
