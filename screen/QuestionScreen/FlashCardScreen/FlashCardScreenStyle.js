import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    ...theme.centerStyle,
    padding: 10,
  },
  progressBarContainer: {
    position: "absolute", // 상단에 고정
    top: 0, // 상단에서 0의 위치에 있음
    left: 0,
    right: 0,
    height: 2,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "blue",
  },
  quizCount: {
    fontWeight: "600",
    fontSize: 18,
  },
});
