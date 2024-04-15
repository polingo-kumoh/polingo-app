import { useQuery } from "react-query";
import axiosInstance from "../config/axiosInstance";

const getUserData = async (token) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("유저 데이터 통신 오류");
  }
};

export const useUserData = (token) => {
  return useQuery(["userData", token], () => getUserData(token));
};
