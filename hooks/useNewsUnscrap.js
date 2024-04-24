// src/hooks/useNewsUnscrap.js
import { useMutation } from "react-query";
import axios from "axios";

const unscrapNews = async ({ token, id }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.delete(
    `${process.env.EXPO_PUBLIC_API_URL}/api/news/scrap/${id}`,
    { headers }
  );
  return response.data;
};

export const useNewsUnscrap = () => {
  return useMutation(unscrapNews);
};
