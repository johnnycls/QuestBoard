import * as React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, Divider, Text } from "@ui-kitten/components";
import { COLOR } from "../../styles";

export default function QuestList({ navigation, isFuture }) {
  const userId = useSelector((state) => state.user.id);
  const quests = isFuture
    ? useSelector((state) =>
        state.quests.quests.filter(
          (quest) => !quest.isEnded && quest.dispatcher === userId
        )
      )
    : useSelector((state) =>
        state.quests.quests.filter(
          (quest) => quest.isEnded && quest.dispatcher === userId
        )
      );

  return (
    <List
      style={{ backgroundColor: COLOR.lightBrown }}
      ItemSeparatorComponent={() => (
        <Divider style={{ backgroundColor: COLOR.gray }} />
      )}
      ListFooterComponent={() => (
        <Divider style={{ backgroundColor: COLOR.gray }} />
      )}
      data={quests}
      renderItem={({ item, index }) => (
        <ListItem
          style={{ backgroundColor: COLOR.lightBrown }}
          title={() => <Text style={{ color: COLOR.black }}>{item.title}</Text>}
          onPress={() =>
            navigation.navigate("Quest", { id: item.id, isEnded: !isFuture })
          }
        />
      )}
    />
  );
}
