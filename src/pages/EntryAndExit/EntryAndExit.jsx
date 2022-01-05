import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Modal from "../../componentes/Modal/Modal";
import EntryForm from "./EntryForm";
import { ExitForm } from "./ExitForm";
import CardEntry from "../../componentes/CardEntry/CardEntry";
import { allEntry, buscarPlaca } from "../../lib/services/Entry/entry.services";
import { EntryDelete } from "./EntryDelete";

const EntryAndExit = () => {
  const [cars, setCars] = useState([]);
  const [modal, setModal] = useState(null);
  const [state, setstate] = useState({ placa: "" });
  const [exit, setExit] = useState();
  const [query, setQuery] = useState("");

  const { placa } = state;

  const handleOnChange = (e) => {
    setQuery(e.target.value);
  };

  const actualizarState = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setExit();
    buscarPlaca(state)
      .then((res) => {
        setExit(res);
      })
      .catch(() => {
        swal({
          title: "¡Error!",
          text: `El vehiculo con placas ${placa} no se encuentra en el taller`,
          icon: "error",
          button: "Aceptar",
        });
      });
  };

  const handleOnClose = () => {
    allEntry(query)
      .then((result) => {
        setCars(result.map((item) => ({ ...item })));
        setModal(null);
        setExit(null);
        setstate({ placa: "" });
      })
      .catch((error) => console.log({ error }));
  };

  const handleOnClick = (car) => {
    setModal(
      <Modal
        show
        title={car ? "Actualizar" : "Ingresar"}
        body={
          <EntryForm
            title="Actualizar"
            car={car}
            handleOnClose={handleOnClose}
          />
        }
        onClose={handleOnClose}
      />
    );
  };

  const handleOnDelete = (e, car) => {
    e.stopPropagation();
    setModal(
      <Modal
        show
        title="Eliminar"
        body={
          <EntryDelete
            car={car}
            title="Eliminar"
            handleOnClose={handleOnClose}
          />
        }
        onClose={handleOnClose}
      />
    );
  };

  useEffect(() => {
    allEntry(query)
      .then((result) => {
        setCars(result.map((item) => ({ ...item })));
      })
      .catch((error) => console.log({ error }));
  }, [query]);

  return (
    <>
      <div className="entryAndExit d-flex justify-content-evenly">
        <div className="entry border border-danger rounded mx-5">
          <EntryForm title="Ingresar" handleOnClose={handleOnClose} />
        </div>
        <div className="exit border border-danger rounded text-center p-4">
          <h2>Salida</h2>
          <form onSubmit={handleOnSubmit} className="container">
            <div className="input-group mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="placa"
                  placeholder="placa"
                  name="placa"
                  value={placa}
                  onChange={actualizarState}
                />
                <label htmlFor="placa">Placa</label>
              </div>

              <button
                className="btn btn-outline-danger"
                type="submit"
                id="placa"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          {exit ? (
            <ExitForm title="Salida" car={exit} handleOnClose={handleOnClose} />
          ) : null}
        </div>
      </div>

      <div className="taller d-flex flex-column align-items-center justify-content-center p-4">
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
              <CardEntry data={car} key={car._id} />
              <div className="botones mt-3">
                <button
                  onClick={() => handleOnClick(car)}
                  type="button"
                  className="btn btn-outline-danger me-3"
                >
                  Editar
                </button>
                <button
                  onClick={(e) => handleOnDelete(e, car)}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1>No se encuentran carros</h1>
        )}
      </div>
      {modal}
    </>
  );
};

export default EntryAndExit;
