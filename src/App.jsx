import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/components/pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;