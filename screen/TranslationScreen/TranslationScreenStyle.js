import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBE7FF",
  },
  input: {
    width: theme.screenWidth,
    height: theme.screenHeight - 300,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    fontSize: 30,
    shadowColor: "#000",
    textAlignVertical: "top",
    paddingTop: 20,
    paddingRight: 60,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputWrapper: {
    position: "relative",
  },
  arrowIconView: {
    position: "absolute",
    right: 20,
    top: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#5337FF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
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
  newTranslationBtn: {
    backgroundColor: "#CAC1FF",
    padding: 20,
    flexDirection: "row",
    borderRadius: 10,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  newTranslationText: {
    fontWeight: "bold",
  },
  saveWordBtn: {
    backgroundColor: "#CAC1FF",
    padding: 20,
    flexDirection: "row",
    borderRadius: 10,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  saveWordText: {
    fontWeight: "bold",
  },
  transView: {
    position: "absolute",
    bottom: theme.screenHeight - 500,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderTopColor: "#CAC1FF",
    borderTopWidth: 3,
  },
  translationText: {
    fontSize: 30,
    color: "#5337FF",
    fontWeight: "600",
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  translationActions: {
    position: "absolute",
    bottom: 110,
    right: 10,
    flexDirection: "row",
    gap: 10,
  },
});
