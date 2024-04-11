import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBE7FF",
  },
  input: {
    width: theme.screenWidth,
    height: theme.screenHeight - 250,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    fontSize: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  translatedLanguage: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },
  language: {
    backgroundColor: "#fff",
    paddingTop: 5,
    paddingBottom: 5,
    width: 130,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: 600,
  },
  transBtn: {
    flexDirection: "row",
    gap: 40,
    ...theme.centerStyle,
  },
  sideBtn: {
    backgroundColor: "#CAC1FF",
    width: 60,
    height: 60,
    borderRadius: 30,
    ...theme.centerStyle,
  },
  centerBtn: {
    backgroundColor: "#5337FF",
    width: 80,
    height: 80,
    borderRadius: 40,
    ...theme.centerStyle,
  },
  sideText: {
    fontWeight: "600",
    fontSize: 12,
  },
  side: {
    ...theme.centerStyle,
    marginTop: 40,
  },
});
