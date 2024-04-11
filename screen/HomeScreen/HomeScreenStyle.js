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
  blank_: {
    flex: 3,
  },
});
