import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  carouselView: {
    flex: 2,
  },
  translationBtn: {
    backgroundColor: "#00CF63",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  transBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  transBtnSubText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 26,
  },
  itemsView: {
    flex: 3,
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemView: {
    flexDirection: "row",
    borderColor: "#D8D8D8",
    borderWidth: 1,
    borderRadius: 10,
    width: "48%",
    padding: 15,
    marginBottom: 20,
    ...theme.centerStyle,
  },
  itemRightMargin: {
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemContent: {
    fontSize: 10,
    fontWeight: "600",
    color: "#D8D8D8",
  },
  itemTextView: {
    marginLeft: 5,
  },
});
