import React from "react";

const CardEntry = ({ data }) => {
  return (
    <>
      <p>
        Placa: <span className="data">{data.placa}</span>
      </p>
      <p>
        Marca: <span className="data">{data.marca}</span>
      </p>
      <p>
        Nombre del conductor:{" "}
        <span className="data">{data.nombreConductor}</span>
      </p>
      <p>
        Número de celular: <span className="data">{data.numeroCelular}</span>
      </p>
      <p>
        Fecha de ingreso: <span className="data">{data.fechaIngreso}</span>
      </p>
      <p>
        Hora de ingreso: <span className="data">{data.horaIngreso}</span>
      </p>
      <p>Servicios:</p>
      {data.servicios.map((servicio) => (
        <div
          className="services border border-danger rounded p-2 mb-2 ms-4"
          key={servicio.nombreServicio}
        >
          <p>
            Servicio: <span className="data">{servicio.nombreServicio}</span>
          </p>
          <p>
            Valor del servicio:{" "}
            <span className="data">{servicio.precioServicio}</span>
          </p>
          <p>
            Repuestos: <span className="data">{servicio.nombreRepuestos}</span>
          </p>
          <p>
            Valor repuestos:{" "}
            <span className="data">{servicio.precioRepuestos}</span>
          </p>
        </div>
      ))}
    </>
  );
};

export default CardEntry;
