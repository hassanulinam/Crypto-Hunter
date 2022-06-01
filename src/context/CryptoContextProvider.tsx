import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { CoinsListUrl } from "../config/api";

export type TypeOfCryptoContext = {
  currency: string;
  symbol: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  coins: any;
};

const cryptoContext = createContext<TypeOfCryptoContext>({
  currency: "",
  symbol: "",
  setCurrency: () => {},
  coins: undefined,
});

const CryptoContextProvider = ({ children }: { children: JSX.Element }) => {
  const [currency, setCurrency] = useState<string>("INR");
  const [symbol, setSymbol] = useState("₹");

  const [coins, setCoins] = useState<any>(undefined);
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
    const fetchCoins = async (): Promise<void> => {
      const { data } = await axios.get(CoinsListUrl(currency));
      setCoins(data);
    };
    fetchCoins();
  }, [currency]);

  return (
    <cryptoContext.Provider value={{ currency, symbol, setCurrency, coins }}>
      {children}
    </cryptoContext.Provider>
  );
};

export default CryptoContextProvider;

export const CryptoState = () => useContext(cryptoContext);
