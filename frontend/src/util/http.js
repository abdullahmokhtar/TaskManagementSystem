import axios from "axios";
import Cookies from "js-cookie";

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = "Bearer " + Cookies.get("token");
  config.baseURL = "http://localhost:3000/";
  return config;
});

export async function register(data) {
  const response = await axios.post("auth/register", data);
  return response;
}

export async function login(data) {
  const response = await axios.post("auth/login", data);
  return response;
}

export async function getAllTasks() {
  const response = await axios.get("tasks");
  return response;
}

export async function getTaskById(id) {
  const response = await axios.get(`tasks/${id}`);
  return response;
}

export async function createTask(data) {
  const response = await axios.post("tasks", data);
  return response;
}

export async function updateTask(id, data) {
  const response = await axios.put(`tasks/${id}`, data);
  return response;
}

export async function deleteTask(id) {
  const response = await axios.delete(`tasks/${id}`);
  return response;
}
