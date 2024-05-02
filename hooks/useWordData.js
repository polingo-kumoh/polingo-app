import { useQuery } from "react-query";
import axios from "axios";

const getWordData = async (token, id) => {
  if (!id) return;
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/wordset/${id}/words/details`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(`Server responded with status: ${err.response.status}`);
    } else {
      throw new Error(
        "Network or other error related to the scrap data request"
      );
    }
  }
};

export const useWordData = (token, id) => {
  return useQuery(["wordData", token, id], () => getWordData(token, id), {
    enabled: !!id && !!token,
    retry: false,
    onError: (error) => {
      console.error("Error fetching word data:", error.message);
    },
  });
};
