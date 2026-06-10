import './styles/ChargesAccountOpening.css';

const ChargesAccountOpening = () => {
  return (
    <section className="account-charges-section">
      <h2 className="charges-account-heading">Charges for Account Opening</h2>

      {/* Table 1: Account Types */}
      <div className="table-wrapper">
        <h3 className="table-title">Type of Account & Charges</h3>
        <div className="table-scroll">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Type of Account</th>
                <th>Charges</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Online account</td>
                <td>Free</td>
              </tr>
              <tr>
                <td>Offline account</td>
                <td>Free</td>
              </tr>
              <tr>
                <td>NRI account (offline only)</td>
                <td>₹ 500</td>
              </tr>
              <tr>
                <td>Partnership, LLP, HUF, or Corporate accounts (offline only)</td>
                <td>₹ 500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Optional Services */}
      <div className="table-wrapper">
        <h3 className="table-title">Charges for Optional Value Added Services</h3>
        <div className="table-scroll">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Billing Frequency</th>
                <th>Charges</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tickertape</td>
                <td>Monthly / Annual</td>
                <td>Free: ₹0 | Pro: ₹249 / ₹2399</td>
              </tr>
              <tr>
                <td>Smallcase</td>
                <td>Per transaction</td>
                <td>Buy & Invest More: ₹100 | SIP: ₹10</td>
              </tr>
              <tr>
                <td>Kite Connect</td>
                <td>Monthly</td>
                <td>Connect: ₹500 | Historical: ₹500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ChargesAccountOpening;
