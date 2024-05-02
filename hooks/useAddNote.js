// src/hooks/useAddNote.js
import { useMutation } from "react-query";
import axios from "axios";

const addNote = async ({ token, name, language }) => {
  const languageData = language === "English" ? "en" : "jp";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/api/wordset`,
    { name, language_code: languageData },
    { headers }
  );
  return response.data;
};

export const useAddNote = () => {
  return useMutation(addNote);
};
