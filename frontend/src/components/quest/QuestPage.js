import * as React from "react";
import { View, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import {
  Button,
  Text,
  TopNavigation,
  Icon,
  Menu,
  MenuItem,
  Divider,
} from "@ui-kitten/components";
import { COLOR } from "../../styles";

export default function QuestPage({ route, navigation }) {
  const { id, isEnded } = route.params;
  // retrieve the quest with the id
  const quest = useSelector((state) =>
    state.quests.quests.find((quest) => quest.id === id)
  );
  // retrieve all the chatrooms created due to the quest
  const chatRooms = useSelector((state) =>
    state.chatRooms.chatRooms.filter(
      (chatRoom) => chatRoom.questId === quest.id
    )
  );

  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lightBrown }}>
      <TopNavigation
        style={{ paddingTop: StatusBar.currentHeight * 0.6 }}
        title={(evaProps) => (
          <Text {...evaProps}>{quest ? quest.title : "No title"}</Text>
        )}
        accessoryRight={() => (
          <>
            <Button
              style={{ backgroundColor: COLOR.brown, borderWidth: 0 }}
              accessoryLeft={(props) => (
                <Icon
                  {...props}
                  name="info"
                  onPress={() =>
                    navigation.navigate("QuestDetail", {
                      id,
                      isEnded,
                      isHero: false,
                    })
                  }
                />
              )}
            />
            {!isEnded && (
              <Button
                style={{ backgroundColor: COLOR.brown, borderWidth: 0 }}
                accessoryLeft={(props) => (
                  <Icon
                    {...props}
                    name="plus-square-outline"
                    onPress={() =>
                      navigation.navigate("QuestHeroes", { questId: id })
                    }
                  />
                )}
              />
            )}
          </>
        )}
      />

      <Menu
        style={{ height: "100%", backgroundColor: COLOR.lightBrown }}
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
              navigation.navigate("Chat", { id: chatRoom.id, isHero: false })
            }
          />
        ))}
      </Menu>
    </View>
  );
}
