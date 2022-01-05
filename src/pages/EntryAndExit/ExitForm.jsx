import React, { useState } from "react";
import swal from "sweetalert";
import { registerExit } from "../../lib/services/Exit/exit.service";

export const ExitForm = ({ title, car, handleOnClose }) => {
  const [formData, setFormData] = useState({
    placa: car ? car.carsDB.placa : "",
    marca: car ? car.carsDB.marca : "",
    nombreConductor: car ? car.carsDB.nombreConductor : "",
    numeroCelular: car ? car.carsDB.numeroCelular : "",
    fechaIngreso: car ? car.carsDB.fechaIngreso : "",
    horaIngreso: car ? car.carsDB.horaIngreso : "",
    servicios: car
      ? car.carsDB.servicios
      : [{ precioServicio: "", nombreServicio: "", cantidad: "" }],
    fechaSalida: "",
    horaSalida: "",
    total: car ? car.total : "",
  });

  const {
    placa,
    marca,
    nombreConductor,
    numeroCelular,
    fechaIngreso,
    horaIngreso,
    servicios,
    fechaSalida,
    horaSalida,
    total,
  } = formData;

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
    if (fechaSalida === "" || horaSalida === "") {
      swal({
        title: "¡Datos faltantes!",
        text: "Todos los datos del formulario son obligatorios para el registro de salida",
        icon: "warning",
        button: "Aceptar",
      });
    } else {
      registerExit(formData)
        .then(() => {
          swal({
            title: "¡Exito!",
            text: "Salida marcada con exito",
            icon: "success",
            button: "Aceptar",
          });
          handleOnClose();
        })
        .catch((error) => console.log({ error }.error.response.data));
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="container">
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="placa"
          placeholder="placa"
          name="placa"
          value={placa}
          onChange={handleOnChange}
        />
        <label htmlFor="placa">Placa</label>
      </div>

      <div className="form-floating mb-3">
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

      <div className="form-floating mb-3">
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

      <div className="form-floating mb-3">
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

      <div className="form-floating mb-3">
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

      <div className="form-floating mb-3">
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
        <label htmlFor="channels" className="col-sm-2 col-form-label">
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
          className="mx-5 p-3 mt-3 border border-danger rounded mb-3"
          key={`servicio-${index}`}
        >
          <div className="form-floating mb-3">
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

          <div className="form-floating mb-3">
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

          <div className="form-floating mb-3">
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

      <div className="form-floating mb-3">
        <input
          type="date"
          className="form-control"
          id="fechaSalida"
          placeholder="fechaSalida"
          name="fechaSalida"
          value={fechaSalida}
          onChange={handleOnChange}
        />
        <label htmlFor="fechaSalida">Fecha de salida</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="time"
          className="form-control"
          id="horaSalida"
          placeholder="horaSalida"
          name="horaSalida"
          value={horaSalida}
          onChange={handleOnChange}
        />
        <label htmlFor="horaSalida">Hora de salida</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="number"
          className="form-control"
          id="total"
          placeholder="total"
          name="total"
          value={total}
          onChange={handleOnChange}
        />
        <label htmlFor="total">Total</label>
      </div>

      <button type="submit" className="btn btn-outline-danger">
        {title}
      </button>
    </form>
  );
};
