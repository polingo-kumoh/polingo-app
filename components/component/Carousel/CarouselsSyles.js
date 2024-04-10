import { StyleSheet } from "react-native";
import theme from "./../../../config/theme";

export const styles = StyleSheet.create({
  carouselView: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 250,
    padding: 50,
    marginLeft: 25,
    marginRight: 25,
    marginTop: theme.screenHeight / 2.5,
    ...theme.centerStyle,
  },
  carouselImage: {
    width: theme.screenWidth / 2,
    height: theme.screenHeight / 3,
  },
});
