import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const runCode = async (payload) => {
  const response = await API.post("/editor/run", payload);
  return response.data;
};

export const submitCode = async (payload) => {
  const response = await API.post("/editor/submit", payload);
  return response.data;
};

export default API;