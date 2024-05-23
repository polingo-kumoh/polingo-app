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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    width: theme.screenWidth / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalOriginal: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: -20,
  },
  modalTrans: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: -10,
  },
  originView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  speak: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  imgBottomSection: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  publishText: {
    fontWeight: "600",
  },
});
