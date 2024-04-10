import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  languageText: {
    fontSize: 18,
    fontWeight: "600",
  },
  languageView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
