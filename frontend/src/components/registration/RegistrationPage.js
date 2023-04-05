import * as React from "react";
import { View, Image } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import { COLOR, styles } from "../../styles";

export default function RegistrationPage({ navigation }) {
  const [phone, setPhone] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: COLOR.brown,
        padding: "10%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <View>
        <View style={{ height: "30%" }}>
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            source={require("../../assets/images/logo.png")}
          />
        </View>

        <Input
          style={[styles.input, { marginTop: "10%" }]}
          placeholder="Phone number"
          placeholderTextColor={COLOR.black}
          keyboardType="numeric"
          value={phone}
          onChangeText={(nextValue) => setPhone(nextValue)}
        />

        <Input
          style={[styles.input, { marginTop: "3%" }]}
          placeholderTextColor={COLOR.black}
          placeholder="Verification Code"
          value={verificationCode}
          onChangeText={(nextValue) => setVerificationCode(nextValue)}
        />

        <Input
          style={[styles.input, { marginTop: "3%" }]}
          placeholderTextColor={COLOR.black}
          placeholder="Enter Password"
          value={password}
          onChangeText={(nextValue) => setPassword(nextValue)}
          secureTextEntry={true}
        />

        <Input
          style={[styles.input, { marginTop: "3%" }]}
          placeholderTextColor={COLOR.black}
          placeholder="Re-enter Password"
          value={rePassword}
          onChangeText={(nextValue) => setRePassword(nextValue)}
          secureTextEntry={true}
        />

        {password === rePassword ? null : (
          <Text style={{ color: COLOR.red, marginTop: "1%" }}>
            Password does not matched
          </Text>
        )}

        <Button style={[styles.button, { marginTop: "6%" }]} onPress={() => {}}>
          Sign up
        </Button>

        <Button
          style={[
            styles.button,
            { marginTop: "3%", backgroundColor: COLOR.red },
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          Already have an account?
        </Button>
      </View>
    </View>
  );
}
