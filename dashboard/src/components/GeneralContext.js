import React, { useState, createContext, useContext } from "react";
import BuyActionWindow from "./BuyActionWindow";
const GeneralContext = createContext({
  openBuyWindow:  () => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [uid, setUid] = useState(null);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow:  (sym) => setUid(sym),
        closeBuyWindow: ()    => setUid(null),
      }}
    >
      {children}
      {uid && <BuyActionWindow uid={uid} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;