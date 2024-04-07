import React from "react";
import "../styles/Slide.scss";
import bath from "../../public/assets/bathtub.png";
const Slide = () => {
  return (
    <div className="slide">
      <img className="bath" src={bath} alt="bathtub" />
      <h5>CLEAN SERVICE</h5>
      <h1>ჩვენ ვასუფთავებთ უმაღლესი სტანდარტების მიხედვით.</h1>
      <h3>
        სწრაფი დასუფთავება საქართველოში <br /> გარანტიით
      </h3>
    </div>
  );
};

export default Slide;
