import React, { useState, useEffect } from "react";
import { allServices } from "../../lib/services/Exit/exit.service";
import CardExit from "../../componentes/CardExit/CardExit";

export const Servicios = () => {
  const [cars, setCars] = useState([]);
  const [query, setQuery] = useState("");

  const handleOnChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    allServices(query)
      .then((result) => {
        setCars(result.map((item) => ({ ...item })));
      })
      .catch((error) => console.log({ error }));
  }, [query]);

  return (
    <div>
      <div className="taller d-flex flex-column align-items-center justify-content-center">
        <h2>Buscar</h2>
        <div className="form-floating col-md-3">
          <input
            className="form-control"
            id="search"
            type="text"
            name="search"
            placeholder="Search"
            value={query}
            onChange={handleOnChange}
          />
          <label htmlFor="floatingInput">Placa</label>
        </div>
      </div>
      <div className="taller d-flex justify-content-center flex-wrap">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div
              key={car._id}
              className="car border border-danger rounded m-4 p-4"
            >
              <CardExit data={car} key={car._id} />
            </div>
          ))
        ) : (
          <h1>No se encuentran carros</h1>
        )}
      </div>
    </div>
  );
};

export default Servicios;
