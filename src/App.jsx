import Header from "./components/Header/Header";
import AboutPages from "./pages/About/About";
import Busket from "./pages/Busket/Busket";
import Home from "./pages/Home/Home";
import Desc from "./pages/Desc/Desc";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginRegistration from "./components/LoginRegistration/LoginRegistration";
import FilteredProducts from "./components/FilteredProducts/FilteredProducts";
import FavoritesPage from "./pages/Favorites/Favorites";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFavorites } from "./redux/AddFav";
import { fetchFavorites } from "./api/favorites";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import ResetParol from "./components/LoginRegistration/ResetParol/ResetParol";
import ErrorBlock from "./components/Error/Error";
import Footer from "./components/Footer/Footer";
import MyMap from "./components/myMap/myMap";
import HeaderNew from "./components/HeaderNew/HeaderNew";
import FooterNew from "./components/FooterNew/FooterNew";
import PrivacyPolicy from "./pages/Policy/PrivacyPolicy";
import TermsOfService from "./pages/Policy/TermsOfService";
import BlogPage from "./components/BlogPage/BlogPage";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const loadFavs = async () => {
      try {
        const data = await fetchFavorites();
        if (Array.isArray(data)) dispatch(setFavorites(data));
      } catch (err) {
        console.error(err);
      }
    };
    loadFavs();
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <LoadingOverlay />}
      {/* <Header /> */}
      <HeaderNew />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPages />} />
        <Route path="/Busket" element={<Busket />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/desc/:id" element={<Desc />} />
        <Route path="/LR" element={<LoginRegistration />} />
        <Route path="/Filter" element={<FilteredProducts />} />
        <Route path="/LR/ResetParol" element={<ResetParol />} />
        <Route path="/Error" element={<ErrorBlock />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<ErrorBlock />} />
      </Routes>
      {/* <MyMap /> */}
      <FooterNew />
      {/* <Footer /> */}
    </>
  );
}

export default App;
