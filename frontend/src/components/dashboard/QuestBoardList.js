import * as React from "react";
import { List, ListItem, Divider } from "@ui-kitten/components";
import { COLOR } from "../../styles";

export default function QuestBoardList({ navigation, quests }) {
  return (
    <List
      style={{
        maxHeight: "100%",
        backgroundColor: COLOR.lightBrown,
      }}
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
          title={item.title}
          onPress={() =>
            navigation.navigate("QuestDetail", {
              id: item.id,
              isEnded: item.isEnded,
              isHero: true,
            })
          }
        />
      )}
    ></List>
  );
}
