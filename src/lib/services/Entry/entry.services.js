import axios from "axios";
const api = process.env.REACT_APP_API;

export const registerEntry = (data) =>
  axios.post(`${api}/ingreso/registrarIngreso`, data).then(({ data }) => data);

export const buscarPlaca = (data) =>
  axios.post(`${api}/ingreso/byPlaca`, data).then(({ data }) => data);

export const allEntry = (search) =>
  axios(`${api}/ingreso/cars?search=${search}`).then(({ data }) => data);

export const updateEntry = (data) =>
  axios.put(`${api}/ingreso/update`, data).then(({ data }) => data);

export const deleteEntry = (data) =>
  axios.delete(`${api}/ingreso/delete`, { data }).then(({ data }) => data);
