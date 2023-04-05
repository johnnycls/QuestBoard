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

export default function DispatcherOwnProfilePage({ navigation }) {
  const dispatch = useDispatch();
  useRedirect({ navigation });

  const dispatcher = useSelector((state) => state.dispatcher);

  const [name, setName] = React.useState("");
  const [selectedGenderIndex, setSelectedGenderIndex] = React.useState("");
  const [dob, setDob] = React.useState(new Date());
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (dispatcher) {
      setName(dispatcher.name);
      setSelectedGenderIndex(
        new IndexPath(
          GENDERS.findIndex((gender) => gender === dispatcher.gender)
        )
      );
      setDob(new Date(dispatcher.dob));
      setDescription(dispatcher.description);
    }
  }, [dispatcher]);

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
          style={{ marginTop: "5%", color: COLOR.black }}
          date={dob}
          onSelect={(nextDate) => setDob(nextDate)}
        />

        <Input
          label={() => <Text>Description</Text>}
          textStyle={{ minHeight: "20%", textAlignVertical: "top" }}
          multiline={true}
          style={{
            marginTop: "5%",
            backgroundColor: COLOR.transparentWhite,
            borderWidth: 0,
          }}
          placeholder="Description..."
          value={description}
          onChangeText={(nextValue) => setDescription(nextValue)}
        />

        <Button
          style={[
            styles.button,
            { marginTop: "10%", backgroundColor: COLOR.darkGreen },
          ]}
          onPress={() => navigation.navigate("Dashboard")}
        >
          Submit
        </Button>

        <Button
          style={[
            styles.button,
            { marginTop: "2%", backgroundColor: COLOR.red },
          ]}
          onPress={() => navigation.navigate("HeroBottomNavigator")}
        >
          Switch to Hero Account
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
