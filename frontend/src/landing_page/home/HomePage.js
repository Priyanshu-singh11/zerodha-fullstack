import React, { lazy, Suspense } from "react";

import Loader from "../../components/Loader";

const Hero = lazy(() => import("./Hero"));
const Award = lazy(() => import("./Award"));
const Stats = lazy(() => import("./Stats"));
const Pricing = lazy(() => import("./Pricing"));
const Education = lazy(() => import("./Education"));
const OpenAccount = lazy(() =>
  import("../../components/OpenAccount")
);

const Load = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

function HomePage() {
  return (
    <>
      {Load(Hero)}
      {Load(Award)}
      {Load(Stats)}
      {Load(Pricing)}
      {Load(Education)}
      {Load(OpenAccount)}
    </>
  );
}

export default HomePage;