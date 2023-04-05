import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Image } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { getHero } from "../../slices/heroSlice";
import { getDispatcher } from "../../slices/dispatcherSlice";
import { logout } from "../../slices/userSlice";
import useRedirect from "../general/useRedirect";
import { COLOR, styles } from "../../styles";

export default function SelectRolePage({ navigation }) {
  const dispatch = useDispatch();
  useRedirect({ navigation });
  const userId = useSelector((state) => state.user.id);

  React.useEffect(() => {
    if (userId !== -1) {
      dispatch(getHero({ id: userId }));
      dispatch(getDispatcher({ id: userId }));
    }
  }, [userId]);

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
      <View style={{ height: "20%" }}>
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={require("../../assets/images/logo.png")}
        />
      </View>

      <Text
        style={{
          textAlign: "center",
          fontSize: 28,
          color: COLOR.white,
          marginTop: "10%",
        }}
      >
        Please Select Your Role
      </Text>

      <Button
        style={[styles.button, { marginTop: "5%" }]}
        onPress={() => navigation.navigate("BottomNavigator")}
      >
        I'm a Dispatcher
      </Button>

      <Button
        style={[styles.button, { marginTop: "3%" }]}
        onPress={() => navigation.navigate("HeroBottomNavigator")}
      >
        I'm a Hero
      </Button>

      <Button
        style={[styles.button, { marginTop: "3%", backgroundColor: COLOR.red }]}
        onPress={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>
    </View>
  );
}
