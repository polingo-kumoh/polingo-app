import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: -10,
  },
  selected: {
    backgroundColor: "#00B0F0",
  },
});
