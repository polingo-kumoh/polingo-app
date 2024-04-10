import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  slogan: {
    fontWeight: "bold",
    fontSize: 24,
    color: theme.psColor,
  },
  loginImageView: {
    flex: 1,
    flexDirection: "row",
  },
  loginImageText: {
    flex: 3,
    paddingLeft: 15,
  },
  polingoView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 20,
  },
  polingo: {
    fontSize: 40,
    color: theme.psColor,
    fontWeight: "bold",
  },
  loginImage: {
    width: "100%",
    height: 350,
    flex: 5,
  },
  loginBtn: {
    gap: 18,
    marginBottom: 80,
    flex: 1,
    ...theme.centerStyle,
  },
  googleSymbol: {
    flex: 1,
  },
  googleLogin: {
    backgroundColor: theme.googleColor,
    width: 300,
    height: 45,
    flexDirection: "row",
    ...theme.centerStyle,
    borderRadius: 6,
  },
  googleText: {
    flex: 6,
    textAlign: "center",
  },
});
