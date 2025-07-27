import { useState, useEffect, useContext } from "react";
import FavBusket from "../../components/FavBusket/FavBusket";
import SelectedItem from "../../components/ObjectToBusket/SelectedItem";
import PersonalAccount from "../../components/PersonalAccount/PersonalAccount";
import SoMayLike from "../../components/SoMayLikePage/SoMayLike";
import PersonalData from "../../components/PersonalData/PersonalData";
import OrderItem from "../../components/myOrders/myOrders";
import { me } from "../../api/auth";
import { LanguageContext } from "../../context/LanguageContext";
import CardItem from "../../components/CardItem/CardItem";

function Busket() {
  const [activeSection, setActiveSection] = useState("cart");
  const [authenticated, setAuthenticated] = useState(false);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await me();
      setAuthenticated(!!user);
    };
    checkAuth();
  }, []);

  return (
    <>
      {authenticated ? (
        <PersonalAccount
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
      ) : (
        <h2 style={{ textAlign: "center" }}>{t("personal.cart")}</h2>
      )}

      {activeSection === "cart" && <SelectedItem />}
      {authenticated && activeSection === "favorites" && <FavBusket />}
      {authenticated && activeSection === "personal" && <PersonalData />}
      {authenticated && activeSection === "order" && <OrderItem />}

      {/* <SoMayLike /> */}
      <CardItem />
      <div className="divider" style={{ marginBottom: "160px" }}></div>
    </>
  );
}

export default Busket;
