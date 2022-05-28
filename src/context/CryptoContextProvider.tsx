import { createContext, useContext, useEffect, useState } from "react";

export type TypeOfCryptoContext = {
  currency: string | unknown;
  symbol: string;
  setCurrency: React.Dispatch<React.SetStateAction<string | unknown>>;
};

const cryptoContext = createContext<TypeOfCryptoContext>({
  currency: "",
  symbol: "",
  setCurrency: () => {},
});

const CryptoContextProvider = ({ children }: { children: JSX.Element }) => {
  const [currency, setCurrency] = useState<string | unknown>("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency == "INR") setSymbol("₹");
    else if (currency == "USD") setSymbol("$");
  }, [currency]);

  return (
    <cryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </cryptoContext.Provider>
  );
};

export default CryptoContextProvider;

export const CryptoState = () => useContext(cryptoContext);
