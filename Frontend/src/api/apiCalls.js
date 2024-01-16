import axios from "axios";

export async function addUser(userData) {
  const response = await axios.post("http://localhost:5000/add-user", userData);
  return response.data;
}

export async function login(userData) {
  const response = await axios.post("http://localhost:5000/login", userData);
  return response;
}

export async function fetchWords() {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get("http://localhost:5000/get-words", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function addWord(wordData) {
  const token = localStorage.getItem('accessToken');
  const response = await axios.post("http://localhost:5000/add-word", wordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function addCard(wordId) {
  const token = localStorage.getItem('accessToken');
  const response = await axios.post("http://localhost:5000/add-card", wordId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchWord(name) {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get(`http://localhost:5000/get-word/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchDueCards() {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get("http://127.0.0.1:5000/get-due-cards", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

{/* http://127.0.0.1:5000/repeat_card/49 a post request to this */}
export async function repeatCard({cardId, rating}) {
  const token = localStorage.getItem('accessToken');
  const response = await axios.post(`http://127.0.0.1:5000/repeat-card/${cardId}`, {rating: rating}, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function uploadFile(fileData) {
  const token = localStorage.getItem('accessToken');
  const formData = new FormData();
  formData.append('file', fileData);

  const response = await axios.post("http://localhost:5000/upload-file", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function fetchDecks() {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get("http://localhost:5000/get-decks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchDeckWords(deckId) {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get("http://localhost:5000/get-deck-words", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      deck_id: deckId
    }
  });
  return response.data;
}

export async function deleteDeck(deckId){
  const token = localStorage.getItem('accessToken');
  const response = await axios.delete("http://localhost:5000/delete-deck", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      deck_id: deckId
    }
  });
  return response.data;
}

export async function addDeck(deckData) {
  const token = localStorage.getItem('accessToken');
  const response = await axios.post("http://localhost:5000/create-deck", deckData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function addCardToDeck(data) {
  const token = localStorage.getItem('accessToken');
  const response = await axios.post("http://localhost:5000/add-card-to-deck", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}