import * as React from "react";
import { View, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { Text, TopNavigation, Tab, TabView } from "@ui-kitten/components";
import HeroTab from "./HeroTab";
import { COLOR } from "../../styles";

const getHeros = (allHeros, requiredHerosId) => {
  return Array(requiredHerosId.length)
    .fill(0)
    .map((ele, idx) => {
      const allHeros_idx = allHeros.findIndex(
        (obj) => obj.id === requiredHerosId[idx]
      );
      return allHeros[allHeros_idx];
    });
};

export default function HeroesPage({ navigation }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const heroes = useSelector((state) => state.heroes.heroes);
  const starredHeroes = useSelector((state) => state.heroes.starredHeroes);
  const historyHeroes = useSelector((state) => state.heroes.historyHeroes);

  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lightBrown }}>
      <TopNavigation
        style={{
          paddingTop: StatusBar.currentHeight,
          backgroundColor: COLOR.brown,
        }}
        title={(evaProps) => (
          <Text {...evaProps} style={{ fontSize: 16, color: COLOR.white }}>
            Heroes
          </Text>
        )}
      />

      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title="New">
          <HeroTab navigation={navigation} heroes={heroes} questId={-1} />
        </Tab>

        <Tab title="History">
          <HeroTab
            navigation={navigation}
            heroes={getHeros(heroes, historyHeroes)}
            questId={-1}
          />
        </Tab>

        <Tab title="Starred">
          <HeroTab
            navigation={navigation}
            heroes={getHeros(heroes, starredHeroes)}
            questId={-1}
          />
        </Tab>
      </TabView>
    </View>
  );
}
