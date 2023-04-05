import * as React from "react";
import { View, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { Text, TopNavigation, Tab, TabView } from "@ui-kitten/components";
import HeroTab from "./HeroTab";

export default function QuestHeroesPage({ route, navigation }) {
  const { questId } = route.params;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const heroes = useSelector((state) => state.heroes.heroes);
  const starredHeroes = useSelector((state) => state.heroes.starredHeroes);
  const historyHeroes = useSelector((state) => state.heroes.historyHeroes);

  return (
    <View style={{ height: "100%" }}>
      <TopNavigation
        style={{ paddingTop: StatusBar.currentHeight }}
        title={(evaProps) => <Text {...evaProps}>Heroes</Text>}
      />

      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title="New">
          <HeroTab navigation={navigation} heroes={heroes} questId={questId} />
        </Tab>

        <Tab title="History">
          <HeroTab
            navigation={navigation}
            heroes={heroes.filter((hero) => historyHeroes.includes(hero.id))}
            questId={questId}
          />
        </Tab>

        <Tab title="Starred">
          <HeroTab
            navigation={navigation}
            heroes={heroes.filter((hero) => starredHeroes.includes(hero.id))}
            questId={questId}
          />
        </Tab>
      </TabView>
    </View>
  );
}
