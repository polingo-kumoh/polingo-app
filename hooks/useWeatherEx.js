import { useQuery } from "react-query";
import axios from "axios";

const getWeatherExData = async (token, default_language, lon, lat) => {
  try {
    const params = new URLSearchParams({
      lang: default_language,
      lon: lon,
      lat: lat,
    });

    const response = await axios.get(
      `${
        process.env.EXPO_PUBLIC_API_URL
      }/api/situation/weather?${params.toString()}`,
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

export const useWeatherEx = (token, default_language, lon, lat) => {
  return useQuery(
    ["weatherExData", token, default_language, lon, lat],
    () => getWeatherExData(token, default_language, lon, lat),
    {
      enabled: !!token,
      retry: false,
      onError: (error) => {
        console.log("Error from query:", error);
      },
    }
  );
};
