import axios from "axios";
console.log(import.meta.env.VITE_API_BASE_URL)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
  withCredentials: true // for cookie-based auth
});

export default api;
