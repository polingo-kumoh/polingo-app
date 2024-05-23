// WordDetailModalStyle.js
import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
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
});
