import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    width: theme.screenWidth - 40,
    height: theme.screenHeight / 2,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginBottom: 20,
    ...theme.centerStyle,
  },
  question: {
    fontWeight: "600",
    fontSize: 30,
  },
  speaker: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  answer: {
    fontWeight: "600",
    color: "blue",
  },
});
