// src/hooks/useDeleteNote.js
import { useMutation } from "react-query";
import axios from "axios";

const deleteNote = async ({ token, id }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.delete(
    `${process.env.EXPO_PUBLIC_API_URL}/api/wordset/${id}`,
    { headers }
  );
  return response.data;
};

export const useDeleteNote = () => {
  return useMutation(deleteNote);
};
