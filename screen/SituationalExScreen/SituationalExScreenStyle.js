import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  bannerText: {
    fontWeight: "600",
    marginBottom: -20,
    fontSize: 16,
  },
  banner: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
    ...theme.centerStyle,
  },
  btnText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#fff",
  },
  bannerBtn: {
    backgroundColor: "#00B0F0",
    flexDirection: "row",
    gap: 10,
    borderRadius: 10,
    marginTop: 20,
    paddingTop: 5,
    paddingBottom: 5,
    ...theme.centerStyle,
  },
  bannerImg: {
    width: 100,
    height: undefined,
    aspectRatio: 1,
  },
  iconView: {
    ...theme.centerStyle,
    marginTop: 10,
  },
  grid: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  item: {
    flex: 1,
    margin: 5,
    height: 100,
  },
});
