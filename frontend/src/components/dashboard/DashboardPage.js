import * as React from "react";
import { View, StatusBar } from "react-native";
import { Icon, Button, Text, TopNavigation } from "@ui-kitten/components";
import QuestList from "./QuestList";
import { COLOR } from "../../styles";

export default function DashboardPage({ navigation }) {
  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lightBrown }}>
      <TopNavigation
        style={{
          paddingTop: StatusBar.currentHeight * 0.7,
          backgroundColor: COLOR.brown,
        }}
        title={(evaProps) => (
          <Text {...evaProps} style={{ fontSize: 16, color: COLOR.white }}>
            Dispatecher - Your Quests
          </Text>
        )}
        accessoryRight={() => (
          <Button
            style={{ backgroundColor: COLOR.brown, borderWidth: 0 }}
            accessoryLeft={(props) => (
              <Icon
                {...props}
                name="edit"
                onPress={() => navigation.navigate("QuestDetail", { id: -1 })}
              />
            )}
          />
        )}
      />

      <QuestList navigation={navigation} isFuture={true} />
    </View>
  );
}
