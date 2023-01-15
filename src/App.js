import React from "react";

import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/:id" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
