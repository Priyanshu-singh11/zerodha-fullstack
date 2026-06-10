import React,{useState,useEffect} from "react";
import axiosAPI from "../api/axios";

const Summary = () => {
  const [user,setUser] = useState('');
  useEffect(()=>{
    axiosAPI.get('/api/auth/verify')
    .then((res)=>{
      if (res.data.status) {
      setUser(res.data.user.username);
    }
    })
  },[])
  return (
    <div className="summary-container">
      <div className="username">
        <h6>Hi, {user} !</h6>
        <hr className="divider" />
      </div>

      <div className="section equity-section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin Available</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Margins Used <span>0</span>
            </p>
            <p>
              Opening Balance <span>3.74k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section holdings-section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Current Value <span>31.43k</span>
            </p>
            <p>
              Investment <span>29.88k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </div>
  );
};

export default Summary;
