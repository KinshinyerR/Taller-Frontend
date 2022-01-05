import React from "react";

export const CardExit = ({ data }) => {
  return (
    <>
      <p>
        Placa: <span className="data">{data.placa}</span>
      </p>
      <p>
        Marca: <span className="data">{data.marca}</span>
      </p>
      <p>
        Nombre del conductor: <span className="data">{data.nombreConductor}</span>
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
        <div className="services border border-danger rounded p-2 mb-2 ms-4" key={servicio.nombreServicio}>
          <p>
            Servicio: <span className="data">{servicio.nombreServicio}</span>
          </p>
          <p>
            Valor del servicio: <span className="data">{servicio.precioServicio}</span>
          </p>
          <p>
            Cantidad: <span className="data">{servicio.cantidad}</span>
          </p>
        </div>
      ))}
      <p>
        Fecha de salida: <span className="data">{data.fechaSalida}</span>
      </p>
      <p>
        Hora de salida: <span className="data">{data.horaSalida}</span>
      </p>
      <p>
        Total pagado: <span className="data">{data.total}</span>
      </p>
    </>
  );
};

export default CardExit;
