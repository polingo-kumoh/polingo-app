import { useQuery } from "react-query";
import axios from "axios";

const getDateExData = async (token, default_language, date) => {
  try {
    const params = new URLSearchParams({
      lang: default_language,
      date: date,
    });

    const response = await axios.get(
      `${
        process.env.EXPO_PUBLIC_API_URL
      }/api/situation/date?${params.toString()}`,
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
      throw new Error("날짜 예문 데이터 통신 오류");
    }
  }
};

export const useDateEx = (token, default_language, date) => {
  return useQuery(
    ["weatherExData", token, default_language, date],
    () => getDateExData(token, default_language, date),
    {
      enabled: !!token,
      retry: false,
      onError: (error) => {
        console.log("Error from query:", error);
      },
    }
  );
};
