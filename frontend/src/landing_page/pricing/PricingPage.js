import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

import Loader from "../../components/Loader";

const Hero = lazy(() => import("./Hero"));
const Brokerage = lazy(() => import("./Brokerage"));
const OpenAccount = lazy(() => import("../../components/OpenAccount"));
const ChargeExplained = lazy(() => import("./ChargeExplained"));
const ChargesAccountOpening = lazy(() => import("./ChargesAccountOpening"));

const Section = ({ Component }) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const PricingPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Brokerage Charges, Fees & Taxes | Zerodha Clone Pricing
        </title>

        <meta
          name="description"
          content="View brokerage charges, account opening fees, transaction charges, GST, STT, SEBI charges and other pricing details for equity, commodity and currency trading."
        />

        <meta
          name="keywords"
          content="brokerage charges, zerodha pricing, trading fees, stock broker charges, equity brokerage, commodity brokerage, currency brokerage"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://yourdomain.com/pricing"
        />

        <meta
          property="og:title"
          content="Brokerage Charges & Pricing"
        />

        <meta
          property="og:description"
          content="Explore brokerage charges, taxes and fees."
        />

        <meta
          property="og:type"
          content="website"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: "Zerodha",
            description:
              "Low-cost brokerage and investment platform.",
            areaServed: "India"
          })}
        </script>
      </Helmet>

      <main>
        <Section Component={Hero} />
        <Section Component={OpenAccount} />
        <Section Component={Brokerage} />
        <Section Component={ChargeExplained} />
        <Section Component={ChargesAccountOpening} />
      </main>
    </>
  );
};

export default PricingPage;