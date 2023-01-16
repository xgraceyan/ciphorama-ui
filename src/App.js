import React from "react";

import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/:account_id" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
