import axios from "axios";

export async function addUser(userData) {
  const response = await axios.post("http://localhost:5000/add_user", userData);
  return response.data;
}

export async function login(userData) {
  const response = await axios.post("http://localhost:5000/login", userData);
  return response;
}

export async function fetchWords() {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get("http://localhost:5000/get_words", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function addWord(wordData) {
  const token = localStorage.getItem('accessToken');
  const response = await axios.post("http://localhost:5000/add_word", wordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function addCard(wordId) {
  const token = localStorage.getItem('accessToken');
  const response = await axios.post("http://localhost:5000/add_card", wordId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchWord(name) {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get(`http://localhost:5000/get_word/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchDueCards() {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get("http://127.0.0.1:5000/get_due_cards", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

{/* http://127.0.0.1:5000/repeat_card/49 a post request to this */}
export async function repeatCard({cardId, rating}) {
  const token = localStorage.getItem('accessToken');
  const response = await axios.post(`http://127.0.0.1:5000/repeat_card/${cardId}`, {rating: rating}, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}