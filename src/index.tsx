import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CryptoContextProvider from "./context/CryptoContextProvider";
import "react-alice-carousel/lib/alice-carousel.css";
import UserAuthContextProvider from "./context/UserAuthContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <CryptoContextProvider>
        <App />
      </CryptoContextProvider>
    </UserAuthContextProvider>
  </React.StrictMode>
);
