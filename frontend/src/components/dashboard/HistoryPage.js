import * as React from "react";
import { View, StatusBar } from "react-native";
import { Text, TopNavigation } from "@ui-kitten/components";
import QuestList from "./QuestList";
import { COLOR } from "../../styles";

export default function HistoryPage({ navigation }) {
  return (
    <View style={{ height: "100%" }}>
      <TopNavigation
        style={{
          paddingTop: StatusBar.currentHeight,
          backgroundColor: COLOR.brown,
        }}
        title={(evaProps) => (
          <Text {...evaProps} style={{ fontSize: 16, color: COLOR.white }}>
            History
          </Text>
        )}
      />
      <QuestList navigation={navigation} isFuture={false} />
    </View>
  );
}
