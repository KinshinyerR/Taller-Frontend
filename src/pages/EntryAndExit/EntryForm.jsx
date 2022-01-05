import React, { useState } from "react";
import swal from "sweetalert";
import {
  registerEntry,
  updateEntry,
} from "../../lib/services/Entry/entry.services";

const EntryForm = ({ title, car, handleOnClose }) => {
  const [formData, setFormData] = useState({
    placa: car ? car.placa : "",
    marca: car ? car.marca : "",
    nombreConductor: car ? car.nombreConductor : "",
    numeroCelular: car ? car.numeroCelular : 0,
    fechaIngreso: car ? car.fechaIngreso : "",
    horaIngreso: car ? car.horaIngreso : "",
    servicios: car
      ? car.servicios
      : [{ precioServicio: "", nombreServicio: "", cantidad: "" }],
  });

  const {
    placa,
    marca,
    nombreConductor,
    numeroCelular,
    fechaIngreso,
    horaIngreso,
    servicios,
  } = formData;

  const errorAlRegistrar = (mensaje) => {
    if (
      placa == "" ||
      marca == "" ||
      nombreConductor == "" ||
      numeroCelular == 0 ||
      fechaIngreso == "" ||
      horaIngreso == "" ||
      servicios == []
    ) {
      swal({
        title: "¡Datos faltantes!",
        text: "Todos los datos del formulario son obligatorios para el registro de entrada",
        icon: "warning",
        button: "Aceptar",
      });
    }
    if (mensaje.startsWith("El")) {
      swal({
        title: "¡Error!",
        text: mensaje,
        icon: "error",
        button: "Aceptar",
      });
    }
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeServices = (e, index) => {
    const newServices = [...servicios];

    newServices[index] = {
      ...newServices[index],
      [e.target.name]: e.target.value,
    };

    setFormData({ ...formData, servicios: newServices });
  };

  const handleOnAddServicio = () => {
    setFormData({
      ...formData,
      servicios: [
        ...servicios,
        { precioServicio: "", nombreServicio: "", cantidad: "" },
      ],
    });
  };

  const handleOnDeleteServicio = (index) => {
    const newServices = [...servicios];

    newServices.splice(index, 1);

    setFormData({ ...formData, servicios: newServices });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    car
      ? updateEntry(formData)
          .then(() => {
            swal({
              title: "¡Exito!",
              text: "Entrada actualizada con exito",
              icon: "success",
              button: "Aceptar",
            });
            handleOnClose();
          })
          .catch((error) => console.log({ error }))
      : registerEntry(formData)
          .then((res) => {
            setFormData({
              placa: "",
              marca: "",
              nombreConductor: "",
              numeroCelular: "",
              fechaIngreso: "",
              horaIngreso: "",
              servicios: [
                { precioServicio: "", nombreServicio: "", cantidad: "" },
              ],
            });
            swal({
              title: "¡Exito!",
              text: "Entrada registrada con exito",
              icon: "success",
              button: "Aceptar",
            });
            handleOnClose();
          })
          .catch((error) => {
            console.log({ error });
            errorAlRegistrar(error.response.data);
          });
  };

  return (
    <form onSubmit={handleOnSubmit} className="container px-5 py-3 text-center">
      <h2>{title}</h2>
      <div className="form-floating py-2">
        <input
          type="text"
          className={car ? "form-control text-dark" : "form-control"}
          id="placa"
          placeholder="placa"
          name="placa"
          value={placa}
          disabled={car ? true : false}
          onChange={handleOnChange}
        />
        <label className={car ? "text-dark" : "text-white"} htmlFor="placa">Placa</label>
      </div>

      <div className="form-floating py-2">
        <input
          type="text"
          className="form-control"
          id="marca"
          placeholder="marca"
          name="marca"
          value={marca}
          onChange={handleOnChange}
        />
        <label htmlFor="marca">Marca</label>
      </div>

      <div className="form-floating py-2">
        <input
          type="text"
          className="form-control"
          id="nombreConductor"
          placeholder="nombreConductor"
          name="nombreConductor"
          value={nombreConductor}
          onChange={handleOnChange}
        />
        <label htmlFor="nombreConductor">Nombre del conductor</label>
      </div>

      <div className="form-floating py-2">
        <input
          type="number"
          className="form-control"
          id="numeroCelular"
          placeholder="numeroCelular"
          name="numeroCelular"
          value={numeroCelular}
          onChange={handleOnChange}
        />
        <label htmlFor="numeroCelular">Número de celular</label>
      </div>

      <div className="form-floating py-2">
        <input
          type="date"
          className="form-control"
          id="fechaIngreso"
          placeholder="fechaIngreso"
          name="fechaIngreso"
          value={fechaIngreso}
          onChange={handleOnChange}
        />
        <label htmlFor="fechaIngreso">Fecha de ingreso</label>
      </div>

      <div className="form-floating py-2">
        <input
          type="time"
          className="form-control"
          id="horaIngreso"
          placeholder="horaIngreso"
          name="horaIngreso"
          value={horaIngreso}
          onChange={handleOnChange}
        />
        <label htmlFor="horaIngreso">Hora de ingreso</label>
      </div>

      <div className="mb-3 row">
        <label htmlFor="channels" className="col-sm-2 col-form-label me-4">
          Servicios
        </label>
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-outline-danger mx-auto"
            onClick={handleOnAddServicio}
          >
            Agregar Servicio
          </button>
        </div>
      </div>

      {servicios.map((servicio, index) => (
        <div
          className="mx-5 p-3 mt-3 border border-danger rounded"
          key={`servicio-${index}`}
        >
          <div className="form-floating py-2">
            <input
              type="text"
              className="form-control"
              id="nombreServicio"
              placeholder="nombreServicio"
              name="nombreServicio"
              value={servicio.nombreServicio}
              onChange={(e) => handleOnChangeServices(e, index)}
            />
            <label htmlFor="nombreServicio">Servicio</label>
          </div>

          <div className="form-floating py-2">
            <input
              type="number"
              className="form-control"
              id="precioServicio"
              placeholder="precioServicio"
              name="precioServicio"
              value={servicio.precioServicio}
              onChange={(e) => handleOnChangeServices(e, index)}
            />
            <label htmlFor="precioServicio">Valor del servicio</label>
          </div>

          <div className="form-floating py-2">
            <input
              type="number"
              className="form-control"
              id="cantidad"
              placeholder="cantidad"
              name="cantidad"
              value={servicio.cantidad}
              onChange={(e) => handleOnChangeServices(e, index)}
            />
            <label htmlFor="cantidad">Cantidad</label>
          </div>
          <button
            onClick={() => handleOnDeleteServicio(index)}
            type="button"
            className="btn btn-outline-danger mx-auto"
          >
            Eliminar Servicio
          </button>
        </div>
      ))}

      {placa ? (
        <button type="submit" className="btn btn-outline-danger my-4">
          {title}
        </button>
      ) : null}
    </form>
  );
};

export default EntryForm;
