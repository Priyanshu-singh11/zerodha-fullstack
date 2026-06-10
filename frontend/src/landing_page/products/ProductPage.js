import React from "react";
import { Helmet } from "react-helmet-async";

import Hero from "./Hero";
import LeftSection from "./LeftSection";
import Rightsection from "./RightSection";
import Universe from "./Universe";

const ProductPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Trading & Investment Products | Zerodha Clone
        </title>

        <meta
          name="description"
          content="Explore Kite, Coin, Console, Kite Connect API and Varsity. Powerful trading, investing and learning products for modern investors."
        />

        <meta
          name="keywords"
          content="Kite, Coin, Console, Varsity, Kite Connect API, Trading Platform, Investment Platform"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://yourdomain.com/products"
        />

        <meta
          property="og:title"
          content="Zerodha Products"
        />

        <meta
          property="og:description"
          content="Explore our ecosystem of trading, investing and learning products."
        />

        <meta
          property="og:type"
          content="website"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "SoftwareApplication",
                name: "Kite"
              },
              {
                "@type": "SoftwareApplication",
                name: "Console"
              },
              {
                "@type": "SoftwareApplication",
                name: "Coin"
              },
              {
                "@type": "SoftwareApplication",
                name: "Kite Connect API"
              },
              {
                "@type": "MobileApplication",
                name: "Varsity Mobile"
              }
            ]
          })}
        </script>
      </Helmet>

      <main>
        <Hero />

        <LeftSection
          heading="Kite"
          desc="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
          img="./Products-image/Kite.png"
          links={[
            "https://kite-demo.zerodha.com/dashboard",
            "https://zerodha.com/products/kite",
          ]}
        />

        <Rightsection
          heading="Console"
          desc="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
          img="./Products-image/console.png"
          link="https://zerodha.com/products/console"
        />

        <LeftSection
          heading="Coin"
          desc="Buy direct mutual funds online, commission-free, delivered directly to your Demat account."
          img="./Products-image/Coin.png"
          links={["https://coin.zerodha.com/"]}
        />

        <Rightsection
          heading="Kite Connect API"
          desc="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs."
          img="./Products-image/kiteconnect.png"
          link="https://zerodha.com/products/api/"
        />

        <LeftSection
          heading="Varsity Mobile"
          desc="Stock market lessons with in-depth coverage and illustrations."
          img="./Products-image/Varsity.png"
          links={["https://zerodha.com/varsity/"]}
        />

        <section
          aria-labelledby="technology-stack"
          className="max-w"
          style={{
            padding: "4rem 1.5rem",
            fontSize: "1.5rem",
            lineHeight: "1.5",
            margin: "4rem auto",
            fontFamily: "Urbanist, sans-serif",
          }}
        >
          <h2
            id="technology-stack"
            style={{ marginBottom: "1rem" }}
          >
            Technology Stack
          </h2>

          <p>
            Want to know more about our technology stack?
            Check out the Zerodha.tech blog.
          </p>
        </section>

        <Universe />
      </main>
    </>
  );
};

export default ProductPage;