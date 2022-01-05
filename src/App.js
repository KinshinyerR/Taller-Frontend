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

    // <>
    //   <h1>Entrada y salida de CARROS</h1>
    //   <div className="container">
    //     <div className="row">
    //       <div className="one-half column">
    //         <EntryAndExit />
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

export default App;
