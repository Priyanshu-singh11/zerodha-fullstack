import React from "react";
import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 60,
        scale: 0.98,
        filter: "blur(90px)"
      }}

      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)"
      }}

      exit={{
        opacity: 0,
        y: -40,
        scale: 0.98,
        filter: "blur(90px)"
      }}

      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }}

      style={{
        width: "100%",
        minHeight: "100vh"
      }}
    >

      {children}

    </motion.div>

  );

};

export default PageWrapper;