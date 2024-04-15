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
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: "90%",
    alignSelf: "center",
  },

  modalImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    maxHeight: 300,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  textStyle: {
    color: "black",
    textAlign: "center",
  },
});
