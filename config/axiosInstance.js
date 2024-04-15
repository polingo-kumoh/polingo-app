// src/config/axiosInstance.js
import axios from "axios";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Alert.alert("세션 만료됨", "다시 로그인 해주세요.", [
        { text: "OK", onPress: () => useNavigation().navigate("LoginScreen") },
      ]);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
