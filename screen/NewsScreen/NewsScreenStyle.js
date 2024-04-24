import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  newsContainer: {
    flex: 1,
    padding: 10,
  },
  newsTitle: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  newsContentTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  newsContents: {
    borderWidth: 1,
    borderColor: "#A7D5FF",
    backgroundColor: "#A7D5FF",
    padding: 10,
    width: 200,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
    alignItems: "flex-start",
  },
  newsImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  publishDate: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "grey",
    position: "absolute",
    bottom: 0,
    right: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF0F0",
    borderColor: "#FFCCCC",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: "grey",
    fontWeight: "500",
  },
});
