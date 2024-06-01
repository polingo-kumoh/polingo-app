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
  },
  overlayTextView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#fff",
    padding: 20,
  },
  overlayView: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 검은색 반투명 오버레이
    borderRadius: 10,
    width: theme.screenWidth - 40,
    height: theme.screenHeight / 4,
  },
  overlayTitle: {
    alignSelf: "center",
  },
  regionText: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 4,
    color: "#fff",
  },
  exampleSentence: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 4,
    color: "#fff",
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
  },
  exampleSentenceTranslation: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: "left",
    fontWeight: "600",
    marginBottom: 4,
    color: "#fff",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10, // 이미지 하단에 위치
    left: 0,
    right: 0,
  },
  indicator: {
    fontSize: 10,
    margin: 3,
  },
});
