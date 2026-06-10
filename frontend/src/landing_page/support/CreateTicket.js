import './styles/CreateTicket.css';
import { motion } from 'framer-motion';
import {
  FaTicketAlt,
  FaUserPlus,
  FaUserCircle,
  FaChartLine,
  FaWallet,
  FaDesktop,
  FaCoins,
  FaChevronRight,
} from 'react-icons/fa';

const sections = [
  {
    title: 'Account Opening',
    icon: <FaUserPlus />,
    items: [
      'Resident individual',
      'Minor',
      'Non Resident Indian (NRI)',
      'Company, Partnership, HUF and LLP',
      'Glossary',
    ],
  },
  {
    title: 'Your Zerodha Account',
    icon: <FaUserCircle />,
    items: [
      'Your Profile',
      'Account modification',
      'Client Master Report (CMR) and Depository Participant (DP)',
      'Nomination',
      'Transfer and conversion of securities',
    ],
  },
  {
    title: 'Kite',
    icon: <FaChartLine />,
    items: [
      'IPO',
      'Trading FAQs',
      'Margin Trading Facility (MTF) and Margins',
      'Charts and orders',
      'Alerts and Nudges',
      'General',
    ],
  },
  {
    title: 'Funds',
    icon: <FaWallet />,
    items: [
      'Add money',
      'Withdraw money',
      'Add bank accounts',
      'eMandates',
    ],
  },
  {
    title: 'Console',
    icon: <FaDesktop />,
    items: [
      'Portfolio',
      'Corporate actions',
      'Funds statement',
      'Reports',
      'Profile',
      'Segments',
    ],
  },
  {
    title: 'Coin',
    icon: <FaCoins />,
    items: [
      'Mutual funds',
      'National Pension Scheme (NPS)',
      'Fixed Deposit (FD)',
      'Features on Coin',
      'Payments and Orders',
      'General',
    ],
  },
];

const CreateTicket = () => {
  return (
    <section className="ticket-section">
      <motion.h1 
        className="ticket-title"
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <FaTicketAlt className="ticket-icon" /> To create a ticket, select a relevant topic
      </motion.h1>

      <div className="ticket-grid">
        {sections.map((section, index) => (
          <motion.div 
            key={section.title} 
            className="ticket-card"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a href="#" className="ticket-heading-link">
              <span className="heading-icon">{section.icon}</span>
              {section.title}
            </a>
            <ul className="ticket-links">
              {section.items.map((item, i) => (
                <li key={i}>
                  <a href="#" className="ticket-link">
                    <FaChevronRight className="link-icon" /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CreateTicket;
