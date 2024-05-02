import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    ...theme.centerStyle,
    gap: 10,
  },
  default: {
    fontWeight: "600",
  },
  quizItem: {
    width: theme.screenWidth / 2 - 20,
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  quizItemView: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 60,
    paddingBottom: 60,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    ...theme.centerStyle,
  },
  quizOptions: {
    padding: 20,
  },
  quizOption: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quizOptionTitle: {
    fontWeight: "600",
  },
  quizTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
});
