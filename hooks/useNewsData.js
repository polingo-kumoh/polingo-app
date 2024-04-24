import { useQuery } from "react-query";
import axios from "axios";

const getNewsData = async (token, default_language, page, size) => {
  const languageCode = default_language === "ENGLISH" ? "en" : "jp";
  const params = new URLSearchParams({
    languageCode,
    page,
    size,
  }).toString();
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/news?${params}`;
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
      throw err;
    } else {
      throw new Error("뉴스 데이터 통신 오류");
    }
  }
};

export const useNewsData = (token, default_language, page, size) => {
  return useQuery(
    ["newsData", token, default_language, page, size],
    () => getNewsData(token, default_language, page, size),
    {
      enabled: !!token,
      retry: false,
      onError: (error) => {
        console.log("Error from query:", error);
      },
    }
  );
};
