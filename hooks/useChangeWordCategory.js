// src/hooks/useChanageWordCategory.js
import { useMutation } from "react-query";
import axios from "axios";

const chanageWordCategory = async ({
  token,
  originNotdeId,
  wordId,
  targetNoteId,
}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/api/wordset/${originNotdeId}/words/move-to/${targetNoteId}`,
    wordId,
    { headers }
  );
  return response.data;
};

export const useChangeWordCategory = () => {
  return useMutation(chanageWordCategory);
};
