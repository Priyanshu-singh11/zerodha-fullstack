import { motion } from 'framer-motion';
import './styles/ChargeExplained.css'


const content = {
  securities: [
    {
      title: 'Securities/Commodities Transaction Tax',
      text: `Tax when transacting on the exchanges. Charged on both sides in delivery trades, and only on sell side for intraday and F&O.`,
    },
    {
      title: 'Zerodha STT/CTT Notice',
      text: `These taxes can be significantly higher than our brokerage. Always review them when trading.`,
    },
    {
      title: 'BSE Transaction Charges',
      text: `Varies based on group: X - ₹10,000/crore, ST/SS - ₹1,00,000/crore, M/MT/TS - ₹275/crore.`,
    },
    {
      title: 'Call & Trade',
      text: `₹50/order for calls placed through dealers (includes auto square-off).`,
    },
    {
      title: 'Stamp Charges',
      text: `As per the Indian Stamp Act, levied on instruments transacted via exchanges.`,
    },
    {
      title: 'NRI Brokerage Charges',
      text: `₹100/F&O, Equity - 0.5% or ₹100/₹200, AMC: ₹500 + GST.`,
    },
    {
      title: 'Account with Debit Balance',
      text: `₹40 per executed order instead of ₹20.`,
    },
    {
      title: "Investor Protection Fund",
      text: `Equity/Futures ₹10cr, Options ₹50cr, Currency ₹0.05–2/lakh + GST.`,
    },
    {
      title: 'MTF Charges',
      text: `0.04% interest/day, 0.3% or ₹20 brokerage, ₹15 pledge fee + GST.`,
    },
  ],
  extra: [
    {
      title: 'GST',
      text: `18% of (brokerage + SEBI + transaction charges).`,
    },
    {
      title: 'SEBI Charges',
      text: `₹10/crore + GST to regulate markets.`,
    },
    {
      title: 'DP Charges',
      text: `₹15.34/scrip (₹3.5 + ₹9.5 + GST), discounts for female holders.`,
    },
    {
      title: 'Pledging Charges',
      text: `₹30 + GST per pledge per ISIN.`,
    },
    {
      title: 'AMC',
      text: `BSDA: ₹0 if < ₹4L; non-BSDA: ₹300/year + GST.`,
    },
    {
      title: 'Corporate Actions',
      text: `₹20 + GST per OFS/buyback/delisting order.`,
    },
    {
      title: 'Off-market Transfers',
      text: `₹25 per transaction.`,
    },
    {
      title: 'Physical CMR Requests',
      text: `First free, then ₹20 + ₹100 + GST.`,
    },
    {
      title: 'Payment Gateway Charges',
      text: `₹9 + GST. Waived on UPI.`,
    },
    {
      title: 'Delayed Payment',
      text: `18% annually or 0.05% daily on debit balance.`,
    },
    {
      title: '3-in-1 Account',
      text: `Delivery/MTF: 0.5%, Intraday: 0.05%.`,
    },
  ],
  disclaimer: `For Delivery based trades, ₹0.01 min will be charged per contract note. Physical contract notes cost ₹20 + courier. Brokerage will never exceed SEBI/exchange limits. All statutory charges apply. Expired, exercised, assigned options are also charged. Free investing is only for individual retail clients. Firms/HUFs must pay ₹20 or 0.1% (lower) on delivery. For physical delivery trades, ₹0.25% applies. Netted-off physically settled: 0.1% brokerage.`,
};

const ChargeExplained = () => {
  return (
    <motion.section
      className="charges-explained"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
    >
      <div className="charges-container">
        <h2 className="section-heading">Charges Explained</h2>
        <div className="card-columns">
          <div className="card-group">
            {content.securities.map((item, i) => (
              <div key={i} className="charge-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="card-group">
            {content.extra.map((item, i) => (
              <div key={i} className="charge-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="disclaimer-box">
          <h3>Disclaimer</h3>
          <p>{content.disclaimer}</p>
        </div>
      </div>
    </motion.section>
    
  );
};

export default ChargeExplained;
