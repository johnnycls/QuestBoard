import * as React from "react";
import { View, StatusBar } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Datepicker,
  IndexPath,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { createQuest, updateQuest } from "../../slices/questsSlice";
import { createChatRoom } from "../../slices/chatRoomsSlice";
import { createContract } from "../../slices/contractSlice";
import { createComment } from "../../slices/commentSlice";
import { COLOR, styles } from "../../styles";

export default function QuestDetailPage({ route, navigation }) {
  // if id === -1: create quest, else: modify quest
  const { id, isEnded, isHero } = route.params;
  const canEdit = !isEnded && !isHero;
  const dispatch = useDispatch();

  // Use as a hero
  const hero = useSelector((state) => state.hero);
  // For quest
  const dispatcher = useSelector((state) => state.user.id);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [reward, setReward] = React.useState("");
  const [selectedHeroTypeIndex, setSelectedHeroTypeIndex] = React.useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState([]);
  const [applyDeadline, setApplyDeadline] = React.useState(new Date());

  const quest = useSelector((state) =>
    state.quests.quests.find((quest) => quest.id === id)
  );
  const newContractId = useSelector((state) => state.contract.contracts.length);
  const newCommentId = useSelector((state) => state.comment.comments.length);
  const heroTypes = useSelector((state) => state.heroTypes.heroTypes);
  const questCategories = useSelector(
    (state) => state.questCategories.questCategories
  );

  React.useEffect(() => {
    if (quest) {
      setTitle(quest.title);
      setDescription(quest.description);
      setReward(quest.reward);
      setSelectedHeroTypeIndex(
        quest.heroTypes.map(
          (heroTypeId) =>
            new IndexPath(
              heroTypes.findIndex((heroType) => heroType.id === heroTypeId)
            )
        )
      );
      setSelectedCategoryIndex(
        quest.categories.map(
          (categoryId) =>
            new IndexPath(
              questCategories.findIndex(
                (category) => category.id === categoryId
              )
            )
        )
      );
      setApplyDeadline(new Date(quest.applyDeadline));
    }
  }, [quest]);

  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lightBrown }}>
      <TopNavigation
        style={{
          paddingTop: isHero
            ? StatusBar.currentHeight * 0.6
            : StatusBar.currentHeight,
        }}
        title={(evaProps) => <Text {...evaProps}>Quest Detail</Text>}
        accessoryRight={() => {
          return isHero ? (
            <Button
              style={{ backgroundColor: COLOR.brown, borderWidth: 0 }}
              accessoryLeft={(props) => (
                <Icon
                  {...props}
                  name="person"
                  onPress={() => {
                    navigation.navigate("DispatcherProfile", {
                      id: quest.dispatcher,
                      questId: -1,
                    });
                  }}
                />
              )}
            />
          ) : null;
        }}
      />

      <View style={{ backgroundColor: COLOR.lightBrown, padding: "2%" }}>
        {canEdit ? (
          <Input
            label={() => <Text>Title</Text>}
            style={{
              backgroundColor: COLOR.transparentWhite,
              borderWidth: 0,
            }}
            placeholder="title"
            value={title}
            onChangeText={(nextValue) => setTitle(nextValue)}
          />
        ) : (
          <Text style={{ textAlign: "center", fontSize: 20 }}>{title}</Text>
        )}

        {canEdit ? (
          <Input
            label={() => <Text>Description</Text>}
            style={{
              backgroundColor: COLOR.transparentWhite,
              borderWidth: 0,
              marginTop: "2%",
            }}
            placeholder="description"
            textStyle={{ minHeight: "20%", textAlignVertical: "top" }}
            value={description}
            onChangeText={(nextValue) => setDescription(nextValue)}
            multiline
          />
        ) : (
          <>
            <Text style={{ marginTop: "4%", fontSize: 16 }}>Description</Text>
            <Text>{description}</Text>
          </>
        )}

        {canEdit ? (
          <Input
            label={() => <Text>Reward</Text>}
            style={{
              backgroundColor: COLOR.transparentWhite,
              borderWidth: 0,
              marginTop: "2%",
            }}
            placeholder="reward"
            value={reward}
            onChangeText={(nextValue) => setReward(nextValue)}
            multiline
          />
        ) : (
          <>
            <Text style={{ marginTop: "4%", fontSize: 16 }}>Reward</Text>
            <Text>{reward}</Text>
          </>
        )}

        {canEdit ? (
          <Select
            style={{
              marginTop: "2%",
            }}
            selectedIndex={selectedHeroTypeIndex}
            placeholder="Hero Type(s)"
            value={
              selectedHeroTypeIndex.length === 0
                ? ""
                : selectedHeroTypeIndex
                    .map((index) => heroTypes[index.row].type)
                    .join(", ")
            }
            onSelect={(index) => setSelectedHeroTypeIndex(index)}
            multiSelect={true}
          >
            {heroTypes.map((heroType) => (
              <SelectItem title={heroType.type} key={heroType.id} />
            ))}
          </Select>
        ) : (
          <Text style={{ marginTop: "4%", fontSize: 16 }}>
            {`Hero Type: ${
              selectedHeroTypeIndex.length === 0
                ? "No Type"
                : selectedHeroTypeIndex
                    .map((index) => heroTypes[index.row].type)
                    .join(", ")
            }
            `}
          </Text>
        )}

        {canEdit ? (
          <Select
            style={{
              marginTop: "2%",
            }}
            selectedIndex={selectedCategoryIndex}
            placeholder="Quest Categories(s)"
            value={
              selectedCategoryIndex.length === 0
                ? ""
                : selectedCategoryIndex
                    .map((index) => questCategories[index.row].category)
                    .join(", ")
            }
            onSelect={(index) => setSelectedCategoryIndex(index)}
            multiSelect={true}
          >
            {questCategories.map((questCategory) => (
              <SelectItem
                title={questCategory.category}
                key={questCategory.id}
              />
            ))}
          </Select>
        ) : (
          <Text style={{ fontSize: 16 }}>
            {`Hero Type: ${
              selectedCategoryIndex.length === 0
                ? "No Category"
                : selectedCategoryIndex
                    .map((index) => questCategories[index.row].category)
                    .join(", ")
            }
            `}
          </Text>
        )}

        {canEdit ? (
          <Datepicker
            style={{
              marginTop: "2%",
            }}
            date={applyDeadline}
            onSelect={(nextDate) => setApplyDeadline(nextDate)}
          />
        ) : (
          <Text>{`Apply Deadline: ${applyDeadline.toLocaleString()}`}</Text>
        )}

        {canEdit && (
          <>
            <Button
              style={[
                styles.button,
                {
                  marginTop: "5%",
                },
              ]}
              onPress={() => {
                if (id === -1) {
                  dispatch(
                    createQuest({
                      dispatcher,
                      title,
                      description,
                      reward,
                      applyDeadline: applyDeadline.toISOString(),
                      isEnded: false,
                      heroTypes: selectedHeroTypeIndex.map(
                        (index) => heroTypes[index.row].id
                      ),
                      categories: selectedCategoryIndex.map(
                        (index) => questCategories[index.row].id
                      ),
                    })
                  );
                  navigation.navigate("Dashboard");
                } else {
                  dispatch(
                    updateQuest({
                      id,
                      title,
                      description,
                      reward,
                      applyDeadline: applyDeadline.toISOString(),
                      isEnded,
                      heroTypes: selectedHeroTypeIndex.map(
                        (index) => heroTypes[index.row].id
                      ),
                      categories: selectedCategoryIndex.map(
                        (index) => questCategories[index.row].id
                      ),
                    })
                  );
                  navigation.navigate("Quest", { id });
                }
              }}
            >
              {id === -1 ? "Create" : "Save Changes"}
            </Button>
            <Button
              style={[
                styles.button,
                {
                  marginTop: "1%",
                  backgroundColor: COLOR.red,
                },
              ]}
              onPress={() => {
                navigation.navigate("Dashboard");
              }}
            >
              {id === -1 ? "Discard Quest" : "Discard Changes"}
            </Button>
          </>
        )}

        {isHero && (
          <Button
            style={[
              styles.button,
              {
                marginTop: "4%",
              },
            ]}
            onPress={() => {
              // const name = quest.title + " - " + hero.name;
              // const description = quest.description;
              // const reward = quest.reward;
              // const contract = newContractId;
              // const members = [quest.dispatcher, hero.id];
              // const questId = id;
              dispatch(
                createChatRoom({
                  name: quest.title + " - " + hero.name,
                  description: quest.description,
                  reward: quest.reward,
                  contract: newContractId,
                  members: [quest.dispatcher, hero.id],
                  questId: id,
                })
              );
              dispatch(
                createContract({
                  id: newContractId,
                  description: quest.description,
                  reward: quest.reward,
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
              navigation.navigate("HeroHome");
            }}
          >
            Apply
          </Button>
        )}
      </View>
    </View>
  );
}
