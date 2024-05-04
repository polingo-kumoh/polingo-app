import { useQuery } from "react-query";
import axios from "axios";

const getQuizData = async (token, id) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/quiz/${id}/create`,
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
      throw new Error("유저 데이터 통신 오류");
    }
  }
};

export const useQuizData = (token, id) => {
  return useQuery(["quizData", token, id], () => getQuizData(token, id), {
    enabled: !!token && !!id,
    retry: false,
    onError: (error) => {
      console.log("Error from query:", error);
    },
  });
};
