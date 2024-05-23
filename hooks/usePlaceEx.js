// usePlaceEx.js
import { useQuery } from "react-query";
import axios from "axios";

const getPlaceExData = async (token, default_language) => {
  try {
    const params = new URLSearchParams({
      language: default_language,
    });

    const response = await axios.get(
      `${
        process.env.EXPO_PUBLIC_API_URL
      }/api/situation/places?${params.toString()}`,
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
      throw new Error("장소 예문 데이터 통신 오류");
    }
  }
};

export const usePlaceEx = (token, default_language) => {
  return useQuery(
    ["placeExData", token, default_language],
    () => getPlaceExData(token, default_language),
    {
      enabled: !!token && !!default_language,
      retry: false,
      onError: (error) => {
        console.log("Error from query:", error);
      },
    }
  );
};
