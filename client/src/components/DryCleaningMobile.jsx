import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/DryCleaningMobile.scss";
import { listingPhotoPaths } from "../data";
import { ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";

const DryCleaningMobile = () => {
  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  return (
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths.map((service, index) => (
            <div key={service.id} className="slides">
              <img src={service.img} alt={`photo ${index + 1}`} />
              <h3 className="service" style={{ paddingTop: "20px" }}>
                {service.price}
              </h3>
              <p>{service.description}</p>
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link className="crft_btn" to={`/category/craftsman/order`}>
        ხელოსნის გამოძახება
      </Link>
    </div>
  );
};

export default DryCleaningMobile;
