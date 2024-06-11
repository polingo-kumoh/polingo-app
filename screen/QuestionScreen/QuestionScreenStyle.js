import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    ...theme.centerStyle,
    gap: 10,
  },
  default: {
    fontWeight: "600",
  },
  quizItem: {
    width: theme.screenWidth / 2 - 20,
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  quizItemView: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 60,
    paddingBottom: 60,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    ...theme.centerStyle,
  },
  quizOptions: {
    padding: 20,
  },
  quizOption: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quizOptionTitle: {
    fontWeight: "600",
  },
  quizTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 20,
    fontSize: 18,
    color: "grey",
    textAlign: "center",
    fontWeight: "600",
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#00B0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    width: theme.screenWidth / 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  default: {
    marginRight: 10,
    fontSize: 12,
    color: "black",
    fontWeight: "600",
  },
});
