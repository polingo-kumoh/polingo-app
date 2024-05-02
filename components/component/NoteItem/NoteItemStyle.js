import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    ...theme.centerStyle,
  },
  check: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    flex: 15,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  itemTrans: {
    fontSize: 20,
    color: "blue",
    fontWeight: "600",
  },
  under: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
