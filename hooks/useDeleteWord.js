// src/hooks/useDeleteNote.js
import { useMutation } from "react-query";
import axios from "axios";

const deleteWord = async ({ token, noteId, wordId }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.delete(
    `${process.env.EXPO_PUBLIC_API_URL}/api/wordset/${noteId}/words`,
    { headers: headers, data: { wordId: wordId } }
  );
  return response.data;
};

export const useDeleteWord = () => {
  return useMutation(deleteWord);
};
