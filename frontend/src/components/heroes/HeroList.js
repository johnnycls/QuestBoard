import * as React from "react";
import { List, ListItem, Divider } from "@ui-kitten/components";
import { age } from "../general/SelfDefinedVariable";
import { COLOR } from "../../styles";

const renderItem = ({ item, index, navigation, questId }) => (
  <ListItem
    style={{ backgroundColor: COLOR.lightBrown }}
    title={`${item.name} | ${item.gender} | (${age(item.dob)})`}
    description={item.description}
    onPress={() => {
      navigation.navigate("HeroProfile", { id: item.id, questId });
    }}
  />
);

export default function HeroList({ displayedHeroes, navigation, questId }) {
  return (
    <List
      style={{ maxHeight: "100%", backgroundColor: COLOR.lightBrown }}
      ListHeaderComponent={() => (
        <Divider style={{ backgroundColor: COLOR.gray }} />
      )}
      ItemSeparatorComponent={() => (
        <Divider style={{ backgroundColor: COLOR.gray }} />
      )}
      ListFooterComponent={() => (
        <Divider style={{ backgroundColor: COLOR.gray }} />
      )}
      data={displayedHeroes}
      renderItem={({ item, index }) =>
        renderItem({ item, index, navigation, questId })
      }
    />
  );
}
