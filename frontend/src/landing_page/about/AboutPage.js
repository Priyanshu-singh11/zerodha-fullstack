import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

import Loader from "../../components/Loader";

const Hero = lazy(() => import("./Hero"));
const Team = lazy(() => import("./Team"));
const Teams = lazy(() => import("./Teams"));

const Section = ({ Component }) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>
          About Us | Zerodha Clone - India's Leading Trading Platform
        </title>

        <meta
          name="description"
          content="Learn about Zerodha's mission, leadership team, company history, technology innovation, and how we transformed stock broking in India."
        />

        <meta
          name="keywords"
          content="Zerodha, About Zerodha, Trading Platform, Stock Broker India, Nithin Kamath, Investment Platform"
        />

        <link
          rel="canonical"
          href="https://yourdomain.com/about"
        />

        <meta
          property="og:title"
          content="About Zerodha Clone"
        />

        <meta
          property="og:description"
          content="Meet the team behind India's largest stock broker."
        />

        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Zerodha",
            url: "https://yourdomain.com",
            description:
              "India's leading discount broker and investment platform.",
            founder: "Nithin Kamath",
          })}
        </script>
      </Helmet>

      <main>
        <Section Component={Hero} />
        <Section Component={Team} />
        <Section Component={Teams} />
      </main>
    </>
  );
};

export default AboutPage;
