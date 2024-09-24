import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:4000/api/",
});

export default axiosBase;
