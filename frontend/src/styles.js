import { StyleSheet } from "react-native";

export const COLOR = {
  brown: "#897056",
  lighterBrown: "#B39c80",
  lightBrown: "#f7f3ed",
  white: "#FFFFFF",
  darkGreen: "#396241",
  lightGreen: "#527258",
  red: "#920E0E",
  transparentWhite: "rgba(255,255,255,0.5)",
  black: "#000000",
  gray: "#999999",
};

export const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    backgroundColor: COLOR.transparentWhite,
    borderWidth: 0,
  },
  button: {
    borderRadius: 5,
    backgroundColor: COLOR.darkGreen,
    borderWidth: 0,
  },
});
