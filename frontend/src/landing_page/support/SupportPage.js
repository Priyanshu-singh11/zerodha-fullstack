import React, { lazy, Suspense } from "react";

import Loader from "../../components/Loader";

const Hero = lazy(() => import("./Hero"));

const CreateTicket = lazy(() =>
  import("./CreateTicket")
);

const Section = ({ Component }) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const SupportPage = () => {

  return (
    <>
      <Section Component={Hero} />
      <Section Component={CreateTicket} />
    </>
  );
};

export default SupportPage;