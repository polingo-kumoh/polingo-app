import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
  },
  labelList: {
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  labelItem: {
    paddingHorizontal: 10,
    marginRight: 10,
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    color: "#ccc",
    fontWeight: "600",
  },
  selectedLabelText: {
    fontWeight: "bold",
    color: "#333",
  },
  underline: {
    height: 2,
    backgroundColor: "#333",
    width: "100%",
    position: "absolute",
    bottom: -5,
  },
  labelContainer: {
    alignItems: "center",
    position: "relative", // 추가
  },
});
