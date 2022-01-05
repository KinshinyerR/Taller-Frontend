import React from "react";
import swal from "sweetalert";
import { deleteEntry } from "../../lib/services/Entry/entry.services";

export const EntryDelete = ({ car, title, handleOnClose }) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    deleteEntry(car)
      .then(() => {
        swal({
          title: "¡Exito!",
          text: `Ingreso del vehiculo ${car.placa} fue eliminado con exito`,
          icon: "success",
          button: "Aceptar",
        });
        handleOnClose();
      })
      .catch((error) => console.log({ error }));
  };
  return (
    <form onSubmit={handleOnSubmit} className="container">
      <div className="mb-3 row text-white">
        <h3>
          ¿Esta seguro que desea eliminar el ingreso del vehiculo {car.placa}?
        </h3>
      </div>

      <button
        type="submit"
        className="btn btn btn-outline-danger my-5 mx-0"
      >
        {title}
      </button>
    </form>
  );
};
