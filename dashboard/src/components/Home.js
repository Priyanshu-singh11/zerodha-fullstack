import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import axiosAPI from "../api/axios";
import UnauthorizedPopup from "./UnauthorizedPopup";
import Loader from "./Loader";

const Home = () => {

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {

        const res = await axiosAPI.get("/api/auth/verify");

        if (res.data.user) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.log(error);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();

  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!authorized ? (
        <UnauthorizedPopup />
      ) : (
        <>
          <TopBar />
          <Dashboard />
        </>
      )}
    </>
  );
};

export default Home;