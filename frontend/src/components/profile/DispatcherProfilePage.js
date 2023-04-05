import * as React from "react";
import { View, StatusBar } from "react-native";
import { age } from "../general/SelfDefinedVariable";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, TopNavigation, Card } from "@ui-kitten/components";
import { COLOR } from "../../styles";

export default function DispatcherProfilePage({ route, navigation }) {
  const dispatch = useDispatch();
  const { id, questId } = route.params;

  const dispatcher = useSelector((state) =>
    state.dispatchers.dispatchers.find((dispatcher) => dispatcher.id === id)
  );
  const quest = useSelector((state) =>
    state.quests.quests.find((quest) => quest.id === questId)
  );

  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lightBrown }}>
      <TopNavigation
        style={{ paddingTop: StatusBar.currentHeight }}
        title={(evaProps) => <Text {...evaProps}>Dispatcher Profile</Text>}
      />

      <View style={{ padding: "2%" }}>
        <Card
          style={{
            borderColor: COLOR.gray,
            borderWidth: 1,
          }}
        >
          <Text>{`Name: ${dispatcher.name}`}</Text>
          <Text>{`Gender: ${dispatcher.gender}`}</Text>
          <Text>{`Age: ${age(dispatcher.dob)}`}</Text>
          <Text>{`Rating: ${4.4}`}</Text>
          <Text>{`Description: ${dispatcher.description}`}</Text>
        </Card>

        {/* <Button>Report</Button> */}
        {questId !== -1 && (
          <Button onPress={() => navigation.navigate("HeroHome")}>
            Contact
          </Button>
        )}
      </View>
    </View>
  );
}
