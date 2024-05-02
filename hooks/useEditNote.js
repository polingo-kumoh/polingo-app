// src/hooks/useEditNote.js
import { useMutation } from "react-query";
import axios from "axios";

const editNote = async ({ token, id, newName }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.put(
    `${process.env.EXPO_PUBLIC_API_URL}/api/wordset/${id}?newName=${newName}`,
    null,
    { headers }
  );
  return response.data;
};

export const useEditNote = () => {
  return useMutation(editNote);
};
