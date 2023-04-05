import * as React from "react";
import { View, Image } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { login } from "../../slices/userSlice";
import { COLOR, styles } from "../../styles";

export default function LoginPage({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const error = useSelector((state) => state.user.error);
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  React.useEffect(() => {
    setPhone("");
    setPassword("");
  }, [isFocused]);

  React.useEffect(() => {
    isSignedIn &&
      navigation.reset({
        index: 0,
        routes: [{ name: "SelectRole" }],
      });
  }, [isSignedIn]);

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
          style={[styles.input, { marginTop: "15%" }]}
          placeholder="Phone Number"
          placeholderTextColor={COLOR.black}
          keyboardType="numeric"
          value={phone}
          onChangeText={(nextValue) => setPhone(nextValue)}
        />

        <Input
          style={[styles.input, { marginTop: "2%" }]}
          placeholder="Password"
          placeholderTextColor={COLOR.black}
          value={password}
          onChangeText={(nextValue) => setPassword(nextValue)}
          secureTextEntry={true}
        />

        {error && (
          <Text style={{ marginTop: 5, color: COLOR.red, textAlign: "center" }}>
            {error}
          </Text>
        )}

        <Button
          style={[styles.button, { marginTop: "10%" }]}
          onPress={() => dispatch(login({ phone, password }))}
        >
          Sign In
        </Button>

        <Button
          style={[
            styles.button,
            { marginTop: "2%", backgroundColor: COLOR.red },
          ]}
          onPress={() => navigation.navigate("Registration")}
        >
          Don't have an account yet?
        </Button>
      </View>
    </View>
  );
}
