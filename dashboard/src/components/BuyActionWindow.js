import React, { useState, useContext } from "react";
import axiosAPI from "../api/axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import { toast } from "react-toastify";

const BuyActionWindow = ({ uid }) => {
  const [qty,   setQty]   = useState(1);
  const [price, setPrice] = useState(0.0);
  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuy = async () => {
    try {
      await axiosAPI.post("/api/dashboard/addOrders", {
        name: uid, qty, price, mode: "BUY",
      });
      toast.success("Order placed successfully");
      closeBuyWindow();
    } catch {
      toast.error("Order failed. Try again.");
    }
  };

  return (
    <div className="buy-window" id="buy-window" draggable="true">
      <div className="bw-header">
        <div>
          <h3 className="bw-title">{uid}</h3>
          <p className="bw-subtitle">NSE · CNC · Regular</p>
        </div>
        <button className="bw-close" onClick={closeBuyWindow}>✕</button>
      </div>

      <div className="bw-body">
        <div className="bw-inputs">
          <fieldset className="bw-field">
            <legend>Quantity</legend>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </fieldset>
          <fieldset className="bw-field">
            <legend>Price (₹)</legend>
            <input
              type="number"
              step="0.05"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </fieldset>
        </div>

        <div className="bw-margin">
          <span>Margin required</span>
          <span className="bw-margin-val">₹140.65</span>
        </div>

        <div className="bw-actions">
          <button className="bw-btn bw-buy"    onClick={handleBuy}>Buy</button>
          <button className="bw-btn bw-sell"   onClick={() => toast.info("Sell coming soon")}>Sell</button>
          <button className="bw-btn bw-cancel" onClick={closeBuyWindow}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;