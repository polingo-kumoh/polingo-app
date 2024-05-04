// src/hooks/useEditNote.js
import { useMutation } from "react-query";
import axios from "axios";

const submitAnswer = async ({ token, id, answerId }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.put(
    `${process.env.EXPO_PUBLIC_API_URL}/api/quiz/submit`,
    {
      answer: [
        {
          quiz_id: id,
          selected_option_id: answerId,
        },
      ],
    },
    { headers }
  );
  return response.data;
};

export const useSubmitAnswer = () => {
  return useMutation(submitAnswer);
};
