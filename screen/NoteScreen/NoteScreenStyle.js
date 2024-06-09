import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export const styles = StyleSheet.create({
  subTitle: {
    fontWeight: "600",
    color: "#2ecc71",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  allCheckText: {
    fontWeight: "600",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  selectedCategory: {
    fontWeight: "600",
    color: "#00B0F0",
  },
  category: {
    flexDirection: "row",
    ...theme.centerStyle,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  pencilIcon: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#00B0F0",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  selectAllButton: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 모달 배경을 투명한 검정색으로 설정
  },
  menuItem: {
    padding: 5,
    width: "100%", // 메뉴 항목을 전체 너비로
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  menuText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
});
