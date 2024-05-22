import { StyleSheet } from "react-native";
import theme from "./../../../config/theme";

export const styles = StyleSheet.create({
  carouselView: {
    ...theme.centerStyle,
    position: "relative",
  },
  carouselImage: {
    width: theme.screenWidth - 40,
    height: theme.screenHeight / 4,
    borderRadius: 10,
    opacity: 0.5,
  },
  overlayTextView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
  },
  overlayTitle: {
    alignSelf: "center",
    marginBottom: 15,
  },
  regionText: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 4,
  },
  exampleSentence: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 4,
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 4,
  },
  exampleSentenceTranslation: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: "left",
    fontWeight: "600",
    marginBottom: 4,
  },
});
