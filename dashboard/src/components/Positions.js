import React,{useState,useEffect} from "react";
import axiosAPI from '../api/axios'
import Loader from './Loader'
const Positions = () => {
  const [positionData,setPositionData] = useState([]);
  const [loader, setLoader] = useState(true)
  useEffect(() => {
  axiosAPI.get('/api/dashboard/positions')
  .then((res) => {
    setPositionData(res.data);
    setLoader(false)
  })
  .catch((err) => {
    console.error("Auth failed for positions:", err.response?.data);
    if (err.response?.status === 401) {
      setPositionData([]);
    }
  });
}, []);


  return (
    <div className="positions-container">
      {loader &&  <Loader/>}
      <div className="positions-header">
        <h3 className="positions-title">
          Open Positions
          <span> ({positionData.length})</span>
        </h3>

        <p className="positions-subtitle">
          Monitor your active market exposure
        </p>
      </div>


      <div className="positions-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {positionData.map((stock, i) => {
                const curVal = +stock.price * +stock.qty;
                const pnl = curVal - +stock.avg * +stock.qty;
                const profit = pnl >= 0;

              return (
               <tr key={i}>
  <td>
    <span className="product-badge">
      {stock.product}
    </span>
  </td>

  <td className="instrument-name">
    {stock.name}
  </td>

  <td>{stock.qty}</td>

  <td>₹{Number(stock.avg).toFixed(2)}</td>

  <td>₹{Number(stock.price).toFixed(2)}</td>

  <td className={profit ? "profit" : "loss"}>
    ₹{Number(pnl).toFixed(2)}
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
    </div>
  );
};

export default Positions;