import React, { useState, useContext, useEffect, useMemo } from "react";
import axiosAPI from "../api/axios";
import GeneralContext from "./GeneralContext";
import { DoughnutChart } from "./DoughnutChart";
import Loader from "./Loader";
import {
  BarChartOutlined,
  MoreHoriz,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Search,
} from "@mui/icons-material";

const WatchList = () => {
  const [watchlist, setWatchlist]   = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loader, setLoader]         = useState(true);

  useEffect(() => {
    axiosAPI.get("api/dashboard/watchlist")
      .then((res) => { setWatchlist(res.data); setLoader(false); })
      .catch((err) => console.log(err));
  }, []);

  const filtered = useMemo(() =>
    watchlist.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [watchlist, searchTerm]);

  const chartData = {
    labels: filtered.map((s) => s.name),
    datasets: [{
      label: "Price",
      data: filtered.map((s) => s.price),
      backgroundColor: ["#3b82f6","#22c55e","#f59e0b","#ef4444","#8b5cf6","#06b6d4"],
      borderWidth: 0,
    }],
  };

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <div>
          <h3>Market Watch</h3>
          <p>Track your stocks</p>
        </div>
        <div className="watchlist-badge">{filtered.length}</div>
      </div>

      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search stocks..."
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="list">
        {filtered.map((stock, i) => (
          <WatchListItem key={i} stock={stock} />
        ))}
      </ul>

      <div className="watchlist-chart">
        <div className="chart-header">
          <h4>Portfolio Distribution</h4>
        </div>
        <DoughnutChart data={chartData} />
        {loader && <Loader />}
      </div>
    </div>
  );
};

export default WatchList;


const WatchListItem = ({ stock }) => {
  const { openBuyWindow } = useContext(GeneralContext);

  return (
    <li className="watchlist-item">

      {/* top row — name & price */}
      <div className="item-top">
        <div className="item-left">
          <div className={`stock-indicator ${stock.isDown ? "red" : "green"}`} />
          <div className="stock-details">
            <h4>{stock.name}</h4>
            <p>{stock.percent}</p>
          </div>
        </div>

        <div className="item-right">
          <div className="stock-price">
            <span className={stock.isDown ? "down" : "up"}>
              ₹{stock.price}
            </span>
            {stock.isDown
              ? <KeyboardArrowDown className="down" fontSize="small" />
              : <KeyboardArrowUp   className="up"   fontSize="small" />
            }
          </div>
        </div>
      </div>

      {/* action row — ALWAYS visible, never hidden */}
      <div className="actions">
        <button className="buy"  onClick={() => openBuyWindow(stock.name)}>
          Buy
        </button>
        <button className="sell" onClick={() => alert("Sell: " + stock.name)}>
          Sell
        </button>
        <button className="icon-btn" aria-label="Chart">
          <BarChartOutlined fontSize="small" />
        </button>
        <button className="icon-btn" aria-label="More">
          <MoreHoriz fontSize="small" />
        </button>
      </div>

    </li>
  );
};