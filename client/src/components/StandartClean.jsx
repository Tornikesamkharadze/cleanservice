import React, { useState, useEffect } from "react";
import "../styles/Register.scss";
import { useSelector } from "react-redux";
import { DatePicker } from "antd";
import { Link } from "react-router-dom";
import { FaArrowTurnDown } from "react-icons/fa6";

const StandartClean = () => {
  const userId = useSelector((state) => state.user?._id); // Access the userId from Redux store

  const [orderData, setOrderData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    date: "", // Add date field to the state
  });

  const [formCompleted, setFormCompleted] = useState(false); // State to track form completion

  useEffect(() => {
    // Check if all fields are completed whenever orderData changes
    const isFormCompleted =
      orderData.firstName !== "" &&
      orderData.lastName !== "" &&
      orderData.phoneNumber !== "" &&
      orderData.date !== ""; // Check if date is not empty
    setFormCompleted(isFormCompleted);
  }, [orderData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      // Handle date separately and format it
      const formattedDate = new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setOrderData({
        ...orderData,
        date: formattedDate,
      });
    } else {
      setOrderData({
        ...orderData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the userId obtained from Redux store
      await fetch("http://localhost:3001/auth/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, orderData }),
      });

      // Clear input fields after submission
      setOrderData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        date: "",
      });

      // Update form completion state
      setFormCompleted(false);
    } catch (err) {
      console.log("Order failed", err.message);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="სახელი"
            name="firstName"
            value={orderData.firstName}
            onChange={handleChange}
            required
            disabled={!userId} // Disable if userId is falsy
          />
          <input
            type="text"
            placeholder="გვარი"
            name="lastName"
            value={orderData.lastName}
            onChange={handleChange}
            required
            disabled={!userId} // Disable if userId is falsy
          />
          <input
            type="text"
            placeholder="ტელეფონის ნომერი"
            name="phoneNumber"
            value={orderData.phoneNumber}
            onChange={handleChange}
            required
            disabled={!userId} // Disable if userId is falsy
          />
          <DatePicker
            format="MM-DD-YYYY"
            onChange={(date, dateString) =>
              handleChange({ target: { name: "date", value: dateString } })
            }
            disabled={!userId} // Disable if userId is falsy
          />
          {userId ? (
            <button type="submit" disabled={!formCompleted}>
              შეკვეთის დამატება
            </button>
          ) : (
            <>
              <div
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p>გთხოვთ გაიაროთ რეგისტრაცია შეკვეთის გასაკეთებლად</p>
                <FaArrowTurnDown
                  style={{
                    marginLeft: "10px",
                  }}
                />
              </div>

              <Link id="btn" to="/register">
                დარეგისტრირდი
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default StandartClean;
