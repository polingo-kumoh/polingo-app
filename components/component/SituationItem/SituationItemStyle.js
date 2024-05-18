import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    margin: 10,
    flex: 1,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemLabel: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
  },
});
