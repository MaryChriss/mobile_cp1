import { Character } from './../components/CharacterRow';
import axios from "axios"

const API_URL = "https://www.demonslayer-api.com/api/v1/characters“?limit=45";
const TRAILER_URL = "https://movies-api.eric-brito.workers.dev/trailer";

export const getCharacters = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

// Método para excluir um filme
export const deleteCharacter = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

// Método para criar um novo filme
export const addharacter = async (Character: string) => {
  const response = await axios.post(API_URL, Character)
  return response.data
}

// Método para atualizar um filme
export const updateCharacter = async (id: number, character: string) => {
  const response = await axios.put(`${API_URL}/${id}`, character)
  return response.data
}
