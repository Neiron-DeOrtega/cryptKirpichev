import axios from 'axios'; 

const api = axios.create({ // Доп параметр для Axios для синтаксического сахара
  baseURL: 'http://localhost:5001', 
});

export default api;
