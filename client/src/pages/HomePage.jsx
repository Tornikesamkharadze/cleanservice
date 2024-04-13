import React from "react";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import PartnerSlider from "../components/PartnerSlider";
import Contact from "../components/Contact";
import SocialPages from "../components/SocialPages";
const HomePage = () => {
  return (
    <>
      <Slide />
      <Categories />
      <Contact />
      <PartnerSlider />
      <SocialPages />
    </>
  );
};

export default HomePage;
