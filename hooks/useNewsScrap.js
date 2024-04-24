// src/hooks/useNewsScrap.js
import { useMutation } from "react-query";
import axios from "axios";

const newsScrap = async ({ token, id }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/api/news/scrap/${id}`,
    null,
    { headers }
  );
  return response.data;
};

export const useNewsScrap = () => {
  return useMutation(newsScrap);
};
