import * as React from "react";
import { View, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import {
  Text,
  TopNavigation,
  Menu,
  MenuItem,
  Divider,
} from "@ui-kitten/components";
import { COLOR } from "../../styles";

export default function HeroHistoryPage({ navigation }) {
  const userId = useSelector((state) => state.user.id);
  const allQuests = useSelector((state) => state.quests.quests);
  const chatRooms = useSelector((state) =>
    state.chatRooms.chatRooms.filter((chatRoom) => {
      const targetQuest = allQuests.find(
        (quest) => quest.id === chatRoom.questId
      );
      if (
        chatRoom.members.includes(userId) &&
        targetQuest.dispatcher !== userId &&
        targetQuest.isEnded
      )
        return chatRoom;
    })
  );

  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lightBrown }}>
      <TopNavigation
        style={{ paddingTop: StatusBar.currentHeight }}
        title={(evaProps) => <Text {...evaProps}>Quests History</Text>}
      />

      <Menu
        style={{ backgroundColor: COLOR.lightBrown }}
        ItemSeparatorComponent={() => (
          <Divider style={{ backgroundColor: COLOR.gray }} />
        )}
        ListFooterComponent={() => (
          <Divider style={{ backgroundColor: COLOR.gray }} />
        )}
      >
        {chatRooms.map((chatRoom) => (
          <MenuItem
            style={{ backgroundColor: COLOR.lightBrown }}
            title={chatRoom.name}
            key={chatRoom.id}
            onPress={() =>
              navigation.navigate("Chat", { id: chatRoom.id, isHero: true })
            }
          />
        ))}
      </Menu>
    </View>
  );
}
