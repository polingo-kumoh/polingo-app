import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  scrollContainer: {
    alignItems: "center",
  },
  linkView: {
    width: "90%",
    alignItems: "flex-end",
  },
  linkText: {
    color: "blue",
  },
  newImage: {
    width: "90%",
    height: theme.screenHeight / 4,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  translationText: {
    fontWeight: "600",
    borderTopColor: "#d8d8d8",
    borderTopWidth: 1,
  },
  grammerText: {
    fontWeight: "600",
  },
  dropDown: {},
  word: {
    fontWeight: "600",
    lineHeight: 20,
  },
  activeWord: {
    backgroundColor: "yellow",
  },
  sentence: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    maxWidth: 250,
  },
});
