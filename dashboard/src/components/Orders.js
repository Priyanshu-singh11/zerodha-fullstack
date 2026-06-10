import React, { useState, useEffect } from "react";
import axiosAPI from '../api/axios'
import Loader from "./Loader";

const Orders = () => {
  const [order, setOrder] = useState([]);
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    axiosAPI.get('api/dashboard/orders')
      .then((res) => {
        setOrder(res.data.orders);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {order.length ? order.map((elem, index) => {
        return (
          <div className="orders" key={index}>
            <div className="orders-item">
              <p>
                Order {index + 1}: {elem.mode} {elem.name}
              </p>

              <div className="orders-buttons">
                <button className="btn buy">Buy</button>
                <button className="btn sell">Sell</button>
              </div>
            </div>
          </div>
        );
      })
        : <h1> PLEASE BUY ORDERS </h1>
      }
      {loader && <Loader />}
    </div>
  );
};

export default Orders;

