import React, { useState, useEffect } from "react";
import axiosAPI from '../api/axios'
import { VerticalGraph } from "./VerticalGraph";
import Loader from './Loader'
const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    axiosAPI('api/dashboard/holdings')
      .then((res) => {
        console.log(res.data);
        setHoldings(res.data);
        setLoader(false)
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
      });
  }, []);

  const labels = holdings.map((h) => h.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: holdings.map((h) => h.price),
        backgroundColor: "rgba(65, 132, 243, 0.7)",
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="holdings-container">
      {loader &&  <Loader/>}
      <div className="holdings-header">
        <h3 className="title">
          Holdings <span>({holdings.length})</span>
        </h3>
      </div>

      {/* TABLE */}
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((stock, i) => {
              const curVal = stock.price * stock.qty;
              const pnl = curVal - stock.avg * stock.qty;
              const profit = pnl >= 0;

              return (
                <tr key={i}>
                  <td className="stock-name">{stock.name}</td>

                  <td>{stock.qty}</td>

                  <td>₹{stock.avg.toFixed(2)}</td>

                  <td>₹{stock.price.toFixed(2)}</td>

                  <td>₹{curVal.toFixed(2)}</td>

                  <td className={profit ? "profit" : "loss"}>
                    ₹{pnl.toFixed(2)}
                  </td>

                  <td className={profit ? "profit" : "loss"}>
                    {stock.net}
                  </td>

                  <td className={stock.isLoss ? "loss" : "profit"}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* GRAPH */}
      <div className="graph-wrapper">
        <div className="graph-header">
          <h3>Portfolio Analytics</h3>
          <p>Live holdings performance overview</p>
        </div>

        <VerticalGraph data={data} />
      </div>
    </div>
  );
};

export default Holdings;