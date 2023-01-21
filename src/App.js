import React from "react";

import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import WalletSummary from "./components/wallet/WalletSummary";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/:account_id" element={<Dashboard />} />
        <Route
          exact
          path="/wallet-summary/:account_id"
          element={<WalletSummary />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
