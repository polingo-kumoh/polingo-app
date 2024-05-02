import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A7D5FF",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryText: {
    fontWeight: "600",
    fontSize: 20,
    paddingLeft: 30,
  },
  iconView: {
    flexDirection: "row",
    gap: 10,
  },
});
