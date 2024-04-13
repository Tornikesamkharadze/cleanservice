import React, { useState, useEffect } from "react";
import { categories } from "../data";
import "../styles/Categories.scss";
import { Link } from "react-router-dom";
import DryCleaningMobile from "./DryCleaningMobile";
import ThreeColumnCard from "./ThreeColumnCard";

const Categories = () => {
  // State to track whether the screen is in desktop mode
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);

  // Function to update the isDesktop state based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 900);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="services" className="categories">
      {/* First set of categories */}
      <h1>სტანდარტული დასუფთავება 80 ლარიდან</h1>
      <p id="title">
        საუკეთესო გზა თქვენი ბინის სისუფთავის <br />
        შესანარჩუნებლად
      </p>
      <div className="categories_list">
        {categories?.slice(0, 8).map((category, index) => (
          <div className="category" key={index}>
            {category.img && <img src={category.img} alt={category.label} />}
            <div className="category_text">
              <h3 style={{ fontSize: "20px" }}>{category.title}</h3>
              <p>{category.description}</p>
              {category.linkTo && (
                <Link
                  className="details"
                  to={`/category/standart/${category.linkTo}`}
                >
                  შეუკვეთე
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Second set of categories */}
      <h1 style={{ paddingTop: "50px" }}>გენერალური დასუფთავება 150 ლარიდან</h1>
      <p id="title">
        იდეალური გადაწყვეტილება მათთვის ვინც ახალ <br />
        ბინაში გადადის საცხოვრებლად
      </p>
      <div className="categories_list" style={{ marginBottom: "50px" }}>
        {categories?.slice(8, 16).map((category, index) => (
          <div className="category" key={index}>
            {category.img && <img src={category.img} alt={category.label} />}
            <div className="category_text">
              <h3 style={{ fontSize: "20px" }}>{category.title}</h3>
              <p>{category.description}</p>
              {category.linkTo && (
                <Link
                  className="details"
                  to={`/category/general/${category.linkTo}`}
                >
                  შეუკვეთე
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Third set of categories */}
      <h1>რბილი ავეჯის და ხალიჩის ქიმიური წმენდა</h1>
      <p id="title">
        პროცედურას ამოჰყავს ღრმად ჩამჯდარი ჭუჭყი,
        <br /> სუნი და ლაქები
      </p>

      {/* Conditional rendering based on screen width */}
      {isDesktop ? <ThreeColumnCard /> : <DryCleaningMobile />}
    </div>
  );
};

export default Categories;
