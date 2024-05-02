import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  progressBarContainer: {
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
});
