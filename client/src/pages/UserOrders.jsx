import React from "react";
import { useSelector } from "react-redux";
import "../styles/UserOrders.scss";
import SocialPages from "../components/SocialPages";

const UserOrders = () => {
  const userInfo = useSelector((state) => state.user);

  return (
    <>
      <div className="user-orders-container">
        {userInfo.orders.length === 0 ? (
          <h1 className="no_order">თქვენ არ გაქვთ აქტიური შეკვეთა</h1>
        ) : (
          userInfo.orders.map((order, index) => (
            <div key={index} className="user-order">
              <div className="order-details">
                <h1 className="title">კატეგორია: {order.category}</h1>
                <p>
                  <span className="list">სახელი:</span> {order.firstName}
                </p>
                <p>
                  <span className="list">გვარი:</span> {order.lastName}
                </p>
                <p>
                  <span className="list">ტელეფონის ნომერი:</span>
                  {order.phoneNumber}
                </p>
                <p>
                  <span className="list">დასუფთავების თარიღი:</span>{" "}
                  {order.date}
                </p>
                <p>
                  <span className="list">დასუფთავების დრო: </span>
                  {order.time}
                </p>
                {order.quantity && (
                  <p>
                    <span className="list">ბინის ფართობი: </span>
                    {order.quantity}
                  </p>
                )}
                {order.price && (
                  <p>
                    <span className="list">დასუფთავების საფასური:</span>{" "}
                    {order.price}
                  </p>
                )}
                {order.services &&
                  order.services.map((service, index) => (
                    <p key={index}>
                      <span className="list">სერივსი:</span>
                      {service}
                    </p>
                  ))}
                <p>
                  <span className="list">მისამართი: </span>
                  {order.address}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <SocialPages />
    </>
  );
};

export default UserOrders;
