import { useQuery } from "react-query";
import axios from "axios";

const getScrapData = async (token, default_language, page, size) => {
  const languageCode = default_language === "ENGLISH" ? "en" : "ja";
  const params = new URLSearchParams({
    languageCode,
    page,
    size,
  }).toString();
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/news/scrap?${params}`;
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

export const useScrapData = (token, default_language, page, size) => {
  return useQuery(
    ["scrapData", token, default_language, page, size],
    () => getScrapData(token, default_language, page, size),
    {
      enabled: !!token,
      retry: false,
      onError: (error) => {
        console.error("Error fetching scrap data:", error.message);
      },
    }
  );
};
