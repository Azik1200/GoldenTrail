import About from "../../components/About/About";
import Advantages from "../../components/Advantages/Advantages";
import BanerReviews from "../../components/BanerReviews/BanerReviews";
import BestSellers from "../../components/BestSellers/BestSellers";
import CardItem from "../../components/CardItem/CardItem";

import ChoseProffesional from "../../components/ChoseProffesional/ChoseProffesional";
import NewProducts from "../../components/NewProducts/NewProducts";
import OrderEasily from "../../components/OrderEasily/OrderEasily";
import PopularBrands from "../../components/PopularBrands/PopularBrands";
import ProductCategories from "../../components/ProductCategories/ProductCategories";
import Reviews from "../../components/Reviews/Reviews";
import Sertificates from "../../components/Sertificates/Sertificates";
import WideUsage from "../../components/WideUsage/WideUsage";

function Home() {
  return (
    <>
      <BanerReviews />
      <CardItem />
      <About />
      <PopularBrands />
      <ProductCategories />
      <NewProducts />
      <BestSellers />
      <ChoseProffesional />
      <WideUsage />
      <Sertificates />
      <Advantages />
      {/* <Reviews /> */}
      <OrderEasily />
    </>
  );
}

export default Home;
