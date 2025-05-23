import React from "react";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import FeatureProducts from "./components/FeatureProducts";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeatureProducts />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
