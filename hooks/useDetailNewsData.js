import { useQuery } from "react-query";
import axios from "axios";

const getDetailNewsData = async (token, id) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/news/${id}`;
  console.log(url);
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

export const useDetailNewsData = (token, id) => {
  return useQuery(
    ["detailData", token, id],
    () => getDetailNewsData(token, id),
    {
      enabled: !!token,
      retry: false,
      onError: (error) => {
        console.error("Error fetching scrap data:", error.message);
      },
    }
  );
};
