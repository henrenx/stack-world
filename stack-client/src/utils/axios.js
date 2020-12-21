import axios from "axios";
const token = localStorage.getItem("tk");
export default axios.create({
  baseURL: "http://localhost:5000",
  headers: { Authorization: "Bearer " + token },
  timeout: 5000,
});
