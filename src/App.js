import React from "react";

import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import WalletDetails from "./components/wallet/WalletDetails";
import WalletSummary from "./components/wallet/WalletSummary";
import Dashboard from "./components/Dashboard";
import RiskRule from "./components/riskRule/RiskRule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/:wallet_addr" element={<Dashboard />} />
        <Route exact path="/wallet-summary" element={<WalletSummary />} />
        <Route
          exact
          path="/wallet-details/:wallet_addr"
          element={<WalletDetails />}
        />
        <Route exact path="/risk-rules" element={<RiskRule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
