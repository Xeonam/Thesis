import axios from "axios";

export async function addUser(userData) {
  const response = await axios.post("http://localhost:5000/add_user", userData);
  return response.data;
}

export async function login(userData) {
  const response = await axios.post("http://localhost:5000/login", userData);
  return response;
}
