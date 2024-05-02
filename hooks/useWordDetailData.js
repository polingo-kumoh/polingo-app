import { useQuery } from "react-query";
import axios from "axios";

const getWordDetailData = async (token, default_language, word) => {
  const code = default_language === "ENGLISH" ? "en" : "ja";
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/word/${code}?word=${word}`;

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

export const useWordDetailData = (token, default_language, word) => {
  return useQuery(
    ["wordDetailData", token, default_language, word],
    () => getWordDetailData(token, default_language, word),
    {
      enabled: !!token && !!default_language && !!word,
      retry: false,
      onError: (error) => {
        console.error("Error fetching word detail data:", error.message);
      },
    }
  );
};
