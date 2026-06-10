import React, { useState } from 'react';
import './styles/Teams.css';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import "react-lazy-load-image-component/src/effects/blur.css";

const teamMembers = [
  {
    name: 'Nithin Kamath',
    role: 'Founder & CEO',
    image: 'https://zerodha.com/static/images/Seema.jpg',
    bio: 'Nithin founded Zerodha in 2010. He is part of SEBI advisory committees and plays basketball for relaxation.',
  },
  {
    name: 'Nikhil Kamath',
    role: 'Co-founder & CFO',
    image: 'https://zerodha.com/static/images/Nikhil.jpg',
    bio: 'Nikhil leads investments at Zerodha and manages financial strategy and operations.',
  },
  {
    name: 'Kailash Nadh',
    role: 'CTO',
    image: 'https://zerodha.com/static/images/Kailash.jpg',
    bio: "Kailash leads Zerodha's tech. He is passionate about open source and software architecture.",
  },
  {
    name: 'Venu Madhav',
    role: 'COO',
    image: 'https://zerodha.com/static/images/Venu.jpg',
    bio: 'Venu oversees operations and compliance, ensuring efficient back-end management.',
  },
  {
    name: 'Karthik Rangappa',
    role: 'Chief of Education',
    image: 'https://zerodha.com/static/images/Hanan.jpg',
    bio: 'Karthik built Varsity, Zerodha’s education portal, and is committed to financial literacy.',
  },
  {
    name: 'Rajan S',
    role: 'Director of Strategy',
    image: 'https://zerodha.com/static/images/karthik.jpg',
    bio: 'Rajan works on product growth strategies and business direction.',
  },
  {
    name: 'Harsha Rao',
    role: 'Director',
    image: 'https://zerodha.com/static/images/Austin.jpg',
    bio: 'Harsha supports core team decisions and manages strategic partnerships.',
  },
];

const TeamGrid = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.5, bounce: 0.25 } },
  };

  const accordionVariants = {
    hidden: { opacity: 0, height: 0, scaleY: 0.95 },
    visible: {
      opacity: 1,
      height: 'auto',
      scaleY: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      height: 0,
      scaleY: 0.95,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  return (
    <div className="team-grid-section">
      <h2 className="team-grid-title">Meet Our Team</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <motion.div
            className="team-card"
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <LazyLoadImage
              loading="lazy"
              effect="blur"
              threshold={100}
              wrapperProps={{
                style: {
                  transition:
                    "all 1s ease"
                }
              }}
              src={member.image}
              alt={member.name}
              className="team-card-img" />
            <h3>{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <button className="accordion-toggle" onClick={() => toggleAccordion(index)}>
              {activeIndex === index ? 'Hide Bio' : 'Read Bio'}
            </button>

            <AnimatePresence initial={false} mode="wait">
              {activeIndex === index && (
                <motion.div
                  className="team-bio"
                  key="content"
                  variants={accordionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p>{member.bio}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;

