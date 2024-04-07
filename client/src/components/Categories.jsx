import React from "react";
import { categories } from "../data";
import "../styles/Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
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
                <Link className="details" to={`/category/standart/${category.linkTo}`}>გაიგე მეტი</Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <h1 style={{ paddingTop: "50px" }}>გენერალური დასუფთავება 150 ლარიდან</h1>
      <p id="title">
        იდეალური გადაწყვეტილება მათთვის ვინც ახალ <br />
        ბინაში გადადის საცხოვრებლად
      </p>
      <div className="categories_list">
        {categories?.slice(8, 16).map((category, index) => (
          <div className="category" key={index}>
            {category.img && <img src={category.img} alt={category.label} />}
            <div className="category_text">
              <h3 style={{ fontSize: "20px" }}>{category.title}</h3>
              <p>{category.description}</p>
              {category.linkTo && (
                <Link className="details" to={`/category/general/${category.linkTo}`}>გაიგე მეტი</Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
