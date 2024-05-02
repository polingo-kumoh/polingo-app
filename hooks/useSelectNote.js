// src/hooks/useEditNote.js
import { useMutation } from "react-query";
import axios from "axios";

const selectNote = async ({ token, id }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.put(
    `${process.env.EXPO_PUBLIC_API_URL}/api/wordset/${id}/set-default`,
    null,
    { headers }
  );
  return response.data;
};

export const useSelectNote = () => {
  return useMutation(selectNote);
};
