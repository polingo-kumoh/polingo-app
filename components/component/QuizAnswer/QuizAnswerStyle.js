import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    width: theme.screenWidth - 40,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginBottom: 10,

    ...theme.centerStyle,
  },
  answer: {
    fontWeight: "600",
  },
  correct: {
    // 정답일 때 적용할 스타일
    backgroundColor: "green",
  },
  incorrect: {
    // 오답일 때 적용할 스타일
    backgroundColor: "red",
  },
  selectedAnswer: {
    color: "#fff",
    fontWeight: "600",
  },
});
