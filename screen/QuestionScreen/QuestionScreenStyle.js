import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    ...theme.centerStyle,
    gap: 10,
  },
  default: {
    fontWeight: "600",
  },
});
