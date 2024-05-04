// src/hooks/useEditNote.js
import { useMutation } from "react-query";
import axios from "axios";

const submitAnswer = async ({ token, answers }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/api/quiz/submit`,
    {
      answers,
    },
    { headers }
  );
  return response.data;
};

export const useSubmitAnswer = () => {
  return useMutation(submitAnswer);
};
