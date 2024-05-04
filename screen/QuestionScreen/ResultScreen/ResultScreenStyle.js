import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  tabView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: theme.screenWidth - 40,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 20,
    marginTop: 20,
  },
  tabItem: {
    fontWeight: "600",
    width: (theme.screenWidth - 40) / 3,
    textAlign: "center",
  },
  selectedTabItem: {
    fontWeight: "600",
    color: "#00B0F0",
    borderBottomWidth: 2,
    borderBottomColor: "#00B0F0",
    width: (theme.screenWidth - 40) / 3,
    textAlign: "center",
  },
  headerButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00B0F0",
  },
});
