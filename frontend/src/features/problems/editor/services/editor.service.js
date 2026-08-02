import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7234/api",
});

export const runCode = async (payload) => {
  const response = await API.post(
    "/code-execution/run",
    payload
  );

  return response.data;
};

export const submitCode = async (payload) => {
  const response = await API.post(
    "/editor/submit",
    payload
  );

  return response.data;
};

export default API;