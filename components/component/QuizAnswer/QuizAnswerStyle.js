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
    color: "#aaa",
    fontWeight: "600",
  },
});
