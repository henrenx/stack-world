import axios from "axios";
const token = localStorage.getItem("tk");
export default axios.create({
  baseURL: "http://localhost:3050/api",
  headers: { Authorization: "BearToken：" + token },
  timeout: 2000,
});
