import React, { useState, useEffect, useContext } from "react";
import "./PersonalData.scss";
import { LanguageContext } from "../../context/LanguageContext";
import { getProfile, updateProfile } from "../../api/profile";

function PersonalData() {
  const { t } = useContext(LanguageContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [addresses, setAddresses] = useState([
    { city: "", street: "", building: "", apartment: "", postalCode: "" },
  ]);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!userInfo.first_name)
      newErrors.first_name = t("personal_data.errors.name");
    if (!userInfo.last_name)
      newErrors.last_name = t("personal_data.errors.surname");
    if (!userInfo.phone) newErrors.phone = t("personal_data.errors.phone");
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await updateProfile({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        phone: userInfo.phone,
      });
      alert(t("personal_data.saved"));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUserInfo({
          username: data.username || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone: data.phone || "",
          email: data.email || "",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="PersonalData-container">
      <h2>
        {t("personal_data.hello")}, {userInfo.username || t("personal_data.guest")}
      </h2>

      <div className="PersonalData-Inputs-Buttons">
        <div className="PersonalData-input">
          <input
            name="username"
            placeholder={t("auth.login_reg.username")}
            type="text"
            value={userInfo.username}
            disabled
            className={userInfo.username ? "filled" : ""}
          />
          <input
            name="email"
            placeholder={t("personal_data.placeholders.email")}
            type="email"
            value={userInfo.email}
            disabled
            className={userInfo.email ? "filled" : ""}
          />
          <input
            name="first_name"
            placeholder={t("personal_data.placeholders.name")}
            type="text"
            value={userInfo.first_name}
            onChange={handleInputChange}
            className={userInfo.first_name ? "filled" : ""}
          />
          {errors.first_name && <span className="error">{errors.first_name}</span>}
          <input
            name="last_name"
            placeholder={t("personal_data.placeholders.surname")}
            type="text"
            value={userInfo.last_name}
            onChange={handleInputChange}
            className={userInfo.last_name ? "filled" : ""}
          />
          {errors.last_name && <span className="error">{errors.last_name}</span>}
          <input
            name="phone"
            placeholder={t("personal_data.placeholders.phone")}
            type="tel"
            value={userInfo.phone}
            onChange={handleInputChange}
            className={userInfo.phone ? "filled" : ""}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <button className="btn-main-busket" onClick={handleSave}>
          {t("personal_data.save_changes")}
        </button>
      </div>

      <div className="PersonalData-Inputs-Block-Add">
        {addresses.map((_, index) => (
          <div key={index} className="PersonalData-Inputs-Add">
            <div className="PersonalData-Name">
              <div className="PersonalData-name">
                {t("personal_data.address")}
              </div>
              {index === addresses.length - 1 && (
                <button
                  className="simvol-btn"
                  onClick={() =>
                    setAddresses((prev) => [
                      ...prev,
                      {
                        city: "",
                        street: "",
                        building: "",
                        apartment: "",
                        postalCode: "",
                      },
                    ])
                  }
                >
                  +
                </button>
              )}
            </div>
            <div className="PersonalData-input">
              <input
                placeholder={t("personal_data.placeholders.city")}
                type="text"
              />
              <input
                placeholder={t("personal_data.placeholders.street")}
                type="text"
              />
              <input
                placeholder={t("personal_data.placeholders.building")}
                type="text"
              />
              <input
                placeholder={t("personal_data.placeholders.apartment")}
                type="text"
              />
              <input
                placeholder={t("personal_data.placeholders.postalCode")}
                type="text"
              />
            </div>
            <button className="btn-main-busket">
              {t("personal_data.save_changes")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalData;

