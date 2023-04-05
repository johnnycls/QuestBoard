import * as React from "react";
import { View, StatusBar } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
  Text,
  TopNavigation,
  IndexPath,
  Select,
  SelectItem,
  Datepicker,
} from "@ui-kitten/components";
import { logout } from "../../slices/userSlice";
import useRedirect from "../general/useRedirect";
import { styles, COLOR } from "../../styles";

const GENDERS = ["Male", "Female"];

export default function HeroOwnProfilePage({ navigation }) {
  const dispatch = useDispatch();
  useRedirect({ navigation });

  const hero = useSelector((state) => state.hero);

  const [name, setName] = React.useState("");
  const [selectedGenderIndex, setSelectedGenderIndex] = React.useState("");
  const [dob, setDob] = React.useState(new Date());
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (hero) {
      setName(hero.name);
      setSelectedGenderIndex(
        new IndexPath(GENDERS.findIndex((gender) => gender === hero.gender))
      );
      setDob(new Date(hero.dob));
      setDescription(hero.description);
    }
  }, [hero]);

  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lighterBrown }}>
      <TopNavigation
        style={{
          paddingTop: StatusBar.currentHeight,
          backgroundColor: COLOR.brown,
        }}
        title={(evaProps) => (
          <Text {...evaProps} style={{ color: COLOR.white }}>
            My Profile
          </Text>
        )}
      />

      <View style={{ padding: "5%" }}>
        <Input
          label={() => <Text>Name</Text>}
          style={{ backgroundColor: COLOR.transparentWhite, borderWidth: 0 }}
          placeholder="Name"
          value={name}
          onChangeText={(nextValue) => setName(nextValue)}
        />
        <Select
          label={() => <Text>Gender</Text>}
          style={{ marginTop: "5%" }}
          selectedIndex={selectedGenderIndex}
          onSelect={(index) => setSelectedGenderIndex(index)}
          value={GENDERS[selectedGenderIndex.row]}
        >
          {GENDERS.map((gender) => (
            <SelectItem key={gender} title={gender} />
          ))}
        </Select>

        <Datepicker
          label={() => <Text>Date of Birth</Text>}
          style={{ marginTop: "5%" }}
          date={dob}
          onSelect={(nextDate) => setDob(nextDate)}
        />

        <Input
          label={() => <Text>Description</Text>}
          multiline={true}
          style={{
            marginTop: "5%",
            backgroundColor: COLOR.transparentWhite,
            borderWidth: 0,
          }}
          textStyle={{ minHeight: "20%", textAlignVertical: "top" }}
          placeholder="Description..."
          value={description}
          onChangeText={(nextValue) => setDescription(nextValue)}
        />

        <Button
          style={[
            styles.button,
            { marginTop: "5%", backgroundColor: COLOR.darkGreen },
          ]}
          onPress={() => navigation.navigate("HeroHome")}
        >
          Submit
        </Button>

        <Button
          style={[
            styles.button,
            { marginTop: "2%", backgroundColor: COLOR.red },
          ]}
          onPress={() => navigation.navigate("BottomNavigator")}
        >
          Switch to Dispatcher Account
        </Button>

        <Button
          style={[
            styles.button,
            { marginTop: "2%", backgroundColor: COLOR.red },
          ]}
          onPress={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}
