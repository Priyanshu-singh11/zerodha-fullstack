import './styles/Brokerage.css';
import { useState } from 'react';
const tabs = ['Equity', 'Currency', 'Commodity'];

const pricingData = {
  Equity: {
    headers: ['Equity Delivery', 'Equity Intraday', 'F&O - Futures', 'F&O - Options'],
    rows: [
      ['Zero Brokerage', '0.03% or ₹20/executed order', '0.03% or ₹20/executed order', 'Flat ₹20 per order'],
      ['0.1% on buy & sell', '0.025% on sell side', '0.02% on sell side', '0.125% intrinsic, 0.1% on sell'],
      ['NSE: 0.00297%, BSE: 0.00375%', 'Same', 'NSE: 0.00173%', 'NSE: 0.03503%'],
      ['18% on charges', 'Same', 'Same', 'Same'],
      ['₹10 / crore', '₹10 / crore', '₹10 / crore', '₹10 / crore'],
      ['0.015% buy', '0.003% buy', '0.002% buy', '0.003% buy'],
    ],
    labels: ['Brokerage', 'STT/CTT', 'Transaction Charges', 'GST', 'SEBI Charges', 'Stamp Charges']
  },
  Currency: {
    headers: ['Currency Futures', 'Currency Options'],
    rows: [
      ['0.03% or ₹20', '₹20 per order'],
      ['No STT', 'No STT'],
      ['NSE: 0.00035%, BSE: 0.00045%', 'NSE: 0.0311%'],
      ['18% on charges', 'Same'],
      ['₹10 / crore', '₹10 / crore'],
      ['0.0001% buy side', 'Same'],
    ],
    labels: ['Brokerage', 'STT/CTT', 'Transaction Charges', 'GST', 'SEBI Charges', 'Stamp Charges']
  },
  Commodity: {
    headers: ['Commodity Futures', 'Commodity Options'],
    rows: [
      ['0.03% or ₹20', '₹20 per order'],
      ['0.01% sell (Non-Agri)', '0.05% sell'],
      ['MCX: 0.0021%, NSE: 0.0001%', 'MCX: 0.0418%, NSE: 0.001%'],
      ['18% on charges', 'Same'],
      ['Agri: ₹1/crore, Non-agri: ₹10/crore', '₹10/crore'],
      ['0.002% buy', '0.003% buy'],
    ],
    labels: ['Brokerage', 'STT/CTT', 'Transaction Charges', 'GST', 'SEBI Charges', 'Stamp Charges']
  },
};

const Brokerage = () => {
  const [activeTab, setActiveTab] = useState('Equity');
  const { headers, rows, labels } = pricingData[activeTab];

  return (
    <>
    <section className="brokerage-section">
      <h1 className="brokerage-title">Charges</h1>
      <p className="brokerage-subtitle">List of all charges and taxes</p>

      <div className="brokerage-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`brokerage-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="table-container">
        <div className="brokerage-table">
          <div className="brokerage-table-header">
            <div className="brokerage-label empty"></div>
            {headers.map((h, i) => (
              <div key={i} className="header-cell">{h}</div>
            ))}
          </div>

          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="brokerage-table-row">
              <div className="brokerage-label">{labels[rowIndex]}</div>
              {row.map((cell, i) => (
                <div key={i} className="table-cell">{cell}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="brokerage-link">
        <a href="https://zerodha.com/brokerage-calculator#tab-equities" target="_blank" rel="noopener noreferrer">
          Calculate your costs upfront →
        </a>
      </p>
    </section>
    </>
  );
};

export default Brokerage;
