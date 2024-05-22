import { useQuery } from "react-query";
import axios from "axios";

const getTimeExData = async (token, default_language) => {
  try {
    const params = new URLSearchParams({
      lang: default_language,
    });

    const response = await axios.get(
      `${
        process.env.EXPO_PUBLIC_API_URL
      }/api/situation/time?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      throw err;
    } else {
      throw new Error("날씨 예문 데이터 통신 오류");
    }
  }
};

export const useTimeEx = (token, default_language) => {
  return useQuery(
    ["timeExData", token, default_language],
    () => getTimeExData(token, default_language),
    {
      enabled: !!token,
      retry: false,
      onError: (error) => {
        console.log("Error from query:", error);
      },
    }
  );
};
