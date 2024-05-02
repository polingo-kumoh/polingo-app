import { StyleSheet } from "react-native";
import theme from "../../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20, // 패딩 값은 디자인에 맞게 조정
  },
  picker: {
    height: 50, // 높이는 디자인에 맞게 조정
    width: "50%",
    marginBottom: 20,
  },
  input: {
    height: 30, // 높이는 디자인에 맞게 조정
    borderColor: "gray", // 테두리 색상은 디자인에 맞게 조정
    borderWidth: 1, // 테두리 두께
    paddingHorizontal: 10, // 내부 좌우 패딩
    width: "80%",
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "10%",
    padding: 10,
  },
});
