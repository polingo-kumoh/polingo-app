import { StyleSheet } from "react-native";
import theme from "./../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    width: theme.screenWidth - 40,
    height: 80,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
    justifyContent: "center",
    marginBottom: 10,
  },
  word: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: -10,
  },
  trans: {},
});
