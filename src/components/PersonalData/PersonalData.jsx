import React, { useState, useEffect, useContext } from "react";
import "./PersonalData.scss";
import { LanguageContext } from "../../context/LanguageContext";
import { getProfile, updateProfile } from "../../api/profile";
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../../api/addresses";

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
    {
      id: undefined,
      address_line: "",
      city: "",
      postal_code: "",
      country: "",
      is_default: false,
    },
  ]);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, field, value) => {
    setAddresses((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
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

  const handleAddressSave = async (index) => {
    const addr = addresses[index];
    const payload = {
      address_line: addr.address_line,
      city: addr.city,
      postal_code: addr.postal_code,
      country: addr.country,
      is_default: addr.is_default,
    };
    try {
      let saved;
      if (addr.id) {
        saved = await updateAddress(addr.id, payload);
      } else {
        saved = await createAddress(payload);
      }
      setAddresses((prev) => {
        const updated = [...prev];
        updated[index] = { ...addr, ...saved };
        return updated;
      });
      alert(t("personal_data.saved"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddressDelete = async (index) => {
    const addr = addresses[index];
    try {
      if (addr.id) {
        await deleteAddress(addr.id);
      }
      setAddresses((prev) => prev.filter((_, i) => i !== index));
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

    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();
        if (Array.isArray(data) && data.length) {
          setAddresses(
            data.map((a) => ({
              id: a.id,
              address_line: a.address_line || "",
              city: a.city || "",
              postal_code: a.postal_code || "",
              country: a.country || "",
              is_default: Boolean(a.is_default),
            }))
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
    fetchAddresses();
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
        {addresses.map((address, index) => (
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
                        id: undefined,
                        address_line: "",
                        city: "",
                        postal_code: "",
                        country: "",
                        is_default: false,
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
                placeholder={t("personal_data.placeholders.address_line")}
                type="text"
                value={address.address_line}
                onChange={(e) =>
                  handleAddressChange(index, "address_line", e.target.value)
                }
                className={address.address_line ? "filled" : ""}
              />
              <input
                placeholder={t("personal_data.placeholders.city")}
                type="text"
                value={address.city}
                onChange={(e) =>
                  handleAddressChange(index, "city", e.target.value)
                }
                className={address.city ? "filled" : ""}
              />
              <input
                placeholder={t("personal_data.placeholders.postalCode")}
                type="text"
                value={address.postal_code}
                onChange={(e) =>
                  handleAddressChange(index, "postal_code", e.target.value)
                }
                className={address.postal_code ? "filled" : ""}
              />
              <input
                placeholder={t("personal_data.placeholders.country")}
                type="text"
                value={address.country}
                onChange={(e) =>
                  handleAddressChange(index, "country", e.target.value)
                }
                className={address.country ? "filled" : ""}
              />
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={address.is_default}
                  onChange={(e) =>
                    handleAddressChange(index, "is_default", e.target.checked)
                  }
                />
                {t("personal_data.placeholders.is_default")}
              </label>
            </div>
            <button
              className="btn-main-busket"
              onClick={() => handleAddressSave(index)}
            >
              {t("personal_data.save_changes")}
            </button>
            <button
              className="btn-main-busket"
              onClick={() => handleAddressDelete(index)}
            >
              {t("personal_data.delete")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalData;

