import * as React from "react";
import {
  View,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import {
  Input,
  Button,
  Text,
  TopNavigation,
  Icon,
  Card,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { createMsg } from "../../slices/msgsSlice";
import { COLOR } from "../../styles";

export default function ChatPage({ route, navigation }) {
  const { id, isHero } = route.params;

  const dispatch = useDispatch();

  const chatRoom = useSelector((state) =>
    state.chatRooms.chatRooms.find((chatRoom) => chatRoom.id === id)
  );
  const msgs = useSelector((state) =>
    state.msgs.msgs.filter((msg) => msg.chatRoom === id)
  );
  const userId = useSelector((state) => state.user.id);

  const [newMsg, setNewMsg] = React.useState("");

  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lightBrown }}>
      <TopNavigation
        style={{ paddingTop: StatusBar.currentHeight * 0.6 }}
        title={(evaProps) => (
          <Text {...evaProps}>{chatRoom && chatRoom.name}</Text>
        )}
        accessoryRight={() => (
          <>
            {chatRoom && userId && chatRoom.members.length === 2 ? (
              <Button
                style={{ backgroundColor: COLOR.brown, borderWidth: 0 }}
                accessoryLeft={(props) => (
                  <Icon
                    {...props}
                    name="person"
                    onPress={() => {
                      if (isHero) {
                        navigation.navigate("DispatcherProfile", {
                          id: chatRoom.members.find((id) => id !== userId),
                          questId: -1,
                        });
                      } else {
                        navigation.navigate("HeroProfile", {
                          id: chatRoom.members.find((id) => id !== userId),
                          questId: -1,
                        });
                      }
                    }}
                  />
                )}
              />
            ) : null}

            <Button
              style={{ backgroundColor: COLOR.brown, borderWidth: 0 }}
              accessoryLeft={(props) => (
                <Icon
                  {...props}
                  name="file-text"
                  onPress={() =>
                    navigation.navigate("Contract", {
                      id: chatRoom.contract,
                      questId: chatRoom.questId,
                      isHero,
                    })
                  }
                />
              )}
            />
          </>
        )}
      />

      <ScrollView>
        {msgs.map((msg) => (
          <View
            key={msg.id}
            style={{
              padding: "1%",
              paddingBottom: 0,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent:
                msg.senderId === userId ? "flex-end" : "flex-start",
            }}
          >
            <Card style={{ width: "85%" }}>
              <Text>{msg.content}</Text>
              <Text style={{ textAlign: "right", color: COLOR.gray }}>
                {new Date(msg.datetime).toLocaleString(`en-GB`, {
                  dateStyle: "short",
                  timeStyle: "short",
                  hourCycle: "h24",
                })}
              </Text>
            </Card>
          </View>
        ))}
      </ScrollView>

      <Input
        value={newMsg}
        onChangeText={(nextValue) => setNewMsg(nextValue)}
        multiline
        size="large"
        accessoryRight={(props) => (
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(
                createMsg({
                  senderId: userId,
                  content: newMsg,
                  chatRoom: chatRoom.id,
                })
              );
              setNewMsg("");
            }}
          >
            <Icon {...props} name="arrow-right" />
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
}

const chat = { width: "85%" };

const chatStyles = StyleSheet.create({
  othersChat: { ...chat },
  myChat: { ...chat },
});
