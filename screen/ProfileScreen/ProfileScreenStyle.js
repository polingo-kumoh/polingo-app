import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userData: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flexStart",
    alignItems: "center",
    gap: 20,
    borderBottomWidth: 1,
    borderColor: theme.lineColor,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  userSetting: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  setting: {
    fontSize: 16,
    fontWeight: "600",
  },
  defaultView: {
    flexDirection: "row",
    alignItems: "center",
  },
  blank_: {
    flex: 8,
  },
});
