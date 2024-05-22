import { useQuery } from "react-query";
import axios from "axios";

const getWeekExData = async (token, default_language) => {
  try {
    const params = new URLSearchParams({
      lang: default_language,
    });

    const response = await axios.get(
      `${
        process.env.EXPO_PUBLIC_API_URL
      }/api/situation/week?${params.toString()}`,
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
      throw new Error("시간 예문 데이터 통신 오류");
    }
  }
};

export const useWeekExData = (token, default_language) => {
  return useQuery(
    ["weekExData", token, default_language],
    () => getWeekExData(token, default_language),
    {
      enabled: !!token,
      retry: false,
      onError: (error) => {
        console.log("Error from query:", error);
      },
    }
  );
};
