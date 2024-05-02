// src/hooks/useAddNote.js
import { useMutation } from "react-query";
import axios from "axios";

const addWord = async ({ token, id, word, description }) => {
  console.log(`${process.env.EXPO_PUBLIC_API_URL}/api/wordset/${id}/words`);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/api/wordset/${id}/words`,
    { word: word, description: description },
    { headers }
  );
  return response.data;
};

export const useAddWord = () => {
  return useMutation(addWord);
};
