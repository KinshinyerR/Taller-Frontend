import axios from "axios";
const api = process.env.REACT_APP_API;

export const registerExit = (data) =>
  axios.post(`${api}/salida/registrarSalida`, data).then(({ data }) => data);

export const allServices = (search) =>
  axios(`${api}/salida/allServices?search=${search}`).then(({ data }) => data);
