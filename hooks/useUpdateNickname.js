// src/hooks/useUpdateNickname.js
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const updateNickname = async (token, newNickname) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await axios.put(
    `${process.env.EXPO_PUBLIC_API_URL}/api/user/nickname?name=${newNickname}`,
    null,
    { headers: headers }
  );
};

export const useUpdateNickname = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ token, newNickname }) => updateNickname(token, newNickname),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userData");
      },
    }
  );
};
