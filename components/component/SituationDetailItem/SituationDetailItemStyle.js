import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  subTitleView: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: -20,
  },
  textTrans: {
    fontWeight: "600",
    color: "gray",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  sentenceView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  lastSentence: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});
