import React, { lazy, Suspense, memo } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { HelmetProvider, Helmet } from "react-helmet-async";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { AuthProvider } from "./context/authContext";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";

const HomePage = lazy(() => import("./landing_page/home/HomePage"));
const AboutPage = lazy(() => import("./landing_page/about/AboutPage"));
const ProductPage = lazy(() => import("./landing_page/products/ProductPage"));
const PricingPage = lazy(() => import("./landing_page/pricing/PricingPage"));
const SupportPage = lazy(() => import("./landing_page/support/SupportPage"));
const SignUpPage = lazy(() => import("./landing_page/signup/SignUp"));
const Login = lazy(() => import("./landing_page/login/Login"));
const NotFound = lazy(() => import("./components/NotFound"));

const VerifyOtp = lazy(() => import("./auth/VerifyOtp"));
const ForgotPassword = lazy(() => import("./auth/ForgotPassword"));
const VerifyResetOtp = lazy(() => import("./auth/VerifyResetOtp"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"));

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/products", element: <ProductPage /> },
  { path: "/pricing", element: <PricingPage /> },
  { path: "/support", element: <SupportPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/login", element: <Login /> },
  { path: "/verify-otp", element: <VerifyOtp /> },
  { path: "/verify-reset-otp", element: <VerifyResetOtp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "*", element: <NotFound /> },
];

const GlobalSEO = memo(() => {
  return (
    <Helmet>
      <title>Zerodha Clone | Stock Trading & Investment Platform</title>

      <meta
        name="description"
        content="Professional stock trading and investment platform built with React and MERN stack. Invest in stocks, IPOs, mutual funds, derivatives, commodities, and bonds."
      />

      <meta
        name="keywords"
        content="stock trading, zerodha clone, investment platform, mutual funds, IPO, online trading, MERN trading app, stock market India"
      />

      <meta name="author" content="Priyanshu Singh" />
      <meta name="robots" content="index, follow" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />

      <meta name="theme-color" content="#0f172a" />

      {/* Open Graph */}
      <meta
        property="og:title"
        content="Zerodha Clone Trading Platform"
      />

      <meta
        property="og:description"
        content="Invest in stocks, mutual funds, IPOs and more with real-time market analytics."
      />

      <meta property="og:type" content="website" />
      <meta property="og:image" content="/Home-images/hero.webp" />
      <meta property="og:url" content="https://yourdomain.com" />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content="Zerodha Clone Trading App"
      />

      <meta
        name="twitter:description"
        content="Advanced stock trading and investment platform."
      />

      <link
        rel="canonical"
        href="https://yourdomain.com"
      />

      <link
        rel="preload"
        as="image"
        href="/Home-images/hero.webp"
      />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Zerodha Clone",
          url: "https://yourdomain.com",
          description:
            "Modern stock trading platform built with MERN stack.",
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://yourdomain.com/search?q={search_term_string}",
            "query-input":
              "required name=search_term_string",
          },
        })}
      </script>
    </Helmet>
  );
});

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <main
          id="main-content"
          key={location.pathname}
        >
          <Suspense fallback={<Loader />}>
            <Routes location={location}>
              {routes.map((route, index) => (
                <Route
                  key={`${route.path}-${index}`}
                  path={route.path}
                  element={
                    <PageWrapper>
                      {route.element}
                    </PageWrapper>
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </main>
      </AnimatePresence>

      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <GlobalSEO />

          <header>
            <Navbar />
          </header>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            pauseOnHover
            theme="dark"
          />

          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);