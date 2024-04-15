// src/hooks/useTextTranslate.js
import { useMutation } from "react-query";
import axios from "axios";

const textTranslate = async ({ token, text, default_language }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/api/translate/plain`,
    { text, source_type: default_language },
    { headers }
  );
  return response.data;
};

export const useTextTranslate = () => {
  return useMutation(textTranslate);
};
