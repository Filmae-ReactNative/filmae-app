import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14213D",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
    alignSelf: "flex-start",
    marginLeft: "13%",
    marginBottom: 5,
  },

  input: {
    width: width * 0.75,
    height: 50,
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: width * 0.75,
    height: 50,
    backgroundColor: "#FCA311",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonCadastro: {
    marginTop: 20,
  },
  textoCadastro: {
    color: "#FCA311",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
