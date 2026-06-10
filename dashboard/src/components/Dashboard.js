import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./Loader";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Summary   = lazy(() => import("./Summary"));
const Orders    = lazy(() => import("./Orders"));
const Holdings  = lazy(() => import("./Holdings"));
const Positions = lazy(() => import("./Positions"));
const Funds     = lazy(() => import("./Funds"));
const Apps      = lazy(() => import("./Apps"));

const Dashboard = () => (
  <GeneralContextProvider>
    <div className="dashboard-container">

      <aside className="sidebar">
        <WatchList />
      </aside>

      <main className="main-content">
        {/* this div centers and caps width at 900px */}
        <div className="main-inner">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/"          element={<Summary />}   />
              <Route path="/orders"    element={<Orders />}    />
              <Route path="/holdings"  element={<Holdings />}  />
              <Route path="/positions" element={<Positions />} />
              <Route path="/funds"     element={<Funds />}     />
              <Route path="/apps"      element={<Apps />}      />
            </Routes>
          </Suspense>
        </div>
      </main>

    </div>
    <ToastContainer theme="dark" position="bottom-right" />
  </GeneralContextProvider>
);

export default Dashboard;