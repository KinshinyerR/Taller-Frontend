import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componentes/Navbar/Navbar";
import EntryAndExit from "./pages/EntryAndExit/EntryAndExit";
import Servicios from "./pages/Servicios/Servicios";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<EntryAndExit />} />
        <Route exact path="/taller" element={<EntryAndExit />} />
        <Route exact path="/servicios" element={<Servicios />} />
      </Routes>
    </Router>
  );
}

export default App;
