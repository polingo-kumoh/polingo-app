// src/hooks/useUpdateLanguage.js
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const updateLanguage = async ({ token, language }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await axios.put(
    `${process.env.EXPO_PUBLIC_API_URL}/api/user/language?languageCode=${language}`,
    null,
    { headers }
  );
};

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation(updateLanguage, {
    onSuccess: () => {
      queryClient.invalidateQueries("userData");
    },
  });
};
