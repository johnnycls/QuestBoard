import * as React from "react";
import { View, StatusBar } from "react-native";
import { age } from "../general/SelfDefinedVariable";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Text,
  TopNavigation,
  Card,
  List,
  ListItem,
  Divider,
} from "@ui-kitten/components";
import { addStarredHero } from "../../slices/heroesSlice";
import { createChatRoom } from "../../slices/chatRoomsSlice";
import { createContract } from "../../slices/contractSlice";
import { createComment } from "../../slices/commentSlice";
import { styles, COLOR } from "../../styles";

const pastExp = [
  {
    title: "Good BGM for my video",
    rating: "4.5",
    comment: "Recommended a good BGM",
    dateOfComment: "2022-05-24T16:00:00.000Z",
  },
  {
    title: "Give comment to my story",
    rating: "",
    comment: "",
    dateOfComment: "",
  },
];

const renderItem = ({ item, index, navigation }) => (
  <ListItem
    title={item.title}
    description={item.comment}
    accessoryRight={() => (
      <Text>
        {item.rating
          ? `${item.rating} (${new Date(
              item.dateOfComment
            ).toLocaleDateString()})`
          : "In Progress"}
      </Text>
    )}
  />
);

export default function HeroProfilePage({ route, navigation }) {
  const dispatch = useDispatch();
  const { id, questId } = route.params;

  const userId = useSelector((state) => state.user.id);
  const hero = useSelector((state) =>
    state.heroes.heroes.find((hero) => hero.id === id)
  );
  // Used if "Contact" is clicked
  const selectedQuest = useSelector((state) =>
    state.quests.quests.find((quest) => quest.id === questId)
  );
  const newContractId = useSelector((state) => state.contract.contracts.length);
  const newCommentId = useSelector((state) => state.comment.comments.length);
  const starredHeroes = useSelector((state) => state.heroes.starredHeroes);

  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lightBrown }}>
      <TopNavigation
        style={{ paddingTop: StatusBar.currentHeight }}
        title={(evaProps) => <Text {...evaProps}>Hero Profile</Text>}
      />
      <View style={{ height: "90%", padding: "2%" }}>
        <Card
          style={{
            height: "100%",
            backgroundColor: COLOR.lightBrown,
            borderColor: COLOR.gray,
            borderWidth: 1,
          }}
        >
          <Text style={{ marginTop: "4%", fontSize: 20 }}>
            Basic Information
          </Text>
          <Text>{`Name: ${hero.name}`}</Text>
          <Text>{`Gender: ${hero.gender}`}</Text>
          <Text>{`Age: ${age(hero.dob)}`}</Text>
          <Text>{`Rating: ${4.4}`}</Text>
          <Text>{`Description: ${hero.description}`}</Text>

          <Text style={{ marginTop: "4%", fontSize: 20 }}>Past Experience</Text>
          <List
            style={{
              backgroundColor: COLOR.lightBrown,
              borderWidth: 1,
              borderColor: COLOR.gray,
            }}
            ItemSeparatorComponent={() => (
              <Divider style={{ backgroundColor: COLOR.gray }} />
            )}
            data={pastExp}
            renderItem={({ item, index }) =>
              renderItem({ item, index, navigation })
            }
          />

          {/* <Button>Report</Button> */}
          <Button
            style={[styles.button, { marginTop: "5%" }]}
            disabled={starredHeroes.includes(id)}
            onPress={() => dispatch(addStarredHero({ id }))}
          >
            Star
          </Button>
          {questId !== -1 && (
            <Button
              style={[styles.button, { marginTop: "2%" }]}
              onPress={() => {
                // const name = selectedQuest.title + " - " + hero.name;
                // const description = selectedQuest.description;
                // const reward = selectedQuest.reward;
                // const contract = -1;
                // const members = [userId, id];
                dispatch(
                  createChatRoom({
                    name: selectedQuest.title + " - " + hero.name,
                    description: selectedQuest.description,
                    reward: selectedQuest.reward,
                    contract: newContractId,
                    members: [userId, id],
                    questId,
                  })
                );
                dispatch(
                  createContract({
                    id: newContractId,
                    description: selectedQuest.description,
                    reward: selectedQuest.reward,
                    status: 0,
                    comment: newCommentId,
                  })
                );
                dispatch(
                  createComment({
                    id: newCommentId,
                    ratingIndex: -1,
                    description: "",
                  })
                );
                navigation.navigate("Quest", { id: questId, isEnded: false });
              }}
            >
              Contact
            </Button>
          )}
        </Card>
      </View>
    </View>
  );
}
