import * as React from "react";
import { View, StatusBar } from "react-native";
import {
  Input,
  Datepicker,
  Select,
  SelectItem,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";
import QuestBoardList from "./QuestBoardList";
import { COLOR } from "../../styles";

const matchSearchKeywords = (quest, searchValue) =>
  searchValue === "" ||
  quest.id == searchValue ||
  quest.title.toLowerCase().includes(searchValue.toLowerCase()) ||
  quest.description.toLowerCase().includes(searchValue.toLowerCase());

const matchSearchReward = (quest, searchValue) =>
  searchValue === "" ||
  quest.reward.toLowerCase().includes(searchValue.toLowerCase());

const matchHeroTypes = (quest, selectedHeroTypes) =>
  selectedHeroTypes.length === 0 ||
  quest.heroTypes.filter((heroType) => selectedHeroTypes.includes(heroType))
    .length !== 0;

const matchQuestCategories = (quest, selectedQuestCategories) =>
  selectedQuestCategories.length === 0 ||
  quest.categories.filter((category) =>
    selectedQuestCategories.includes(category)
  ).length !== 0;

const matchLastUpdateAfter = (quest, lastUpdateAfter) =>
  new Date(quest.lastUpdate) >= lastUpdateAfter;

export default function QuestBoardPage({ navigation }) {
  const quests = useSelector((state) =>
    state.quests.quests.filter((quest) => !quest.isEnded)
  );
  const questCategories = useSelector(
    (state) => state.questCategories.questCategories
  );
  const heroTypes = useSelector((state) => state.heroTypes.heroTypes);

  const [searchKeywords, setSearchKeywords] = React.useState("");
  const [searchReward, setSearchReward] = React.useState("");
  const [selectedHeroTypeIndices, setSelectedHeroTypeIndices] = React.useState(
    []
  );
  const [selectedQuestCategoryIndices, setSelectedQuestCategoryIndices] =
    React.useState([]);
  const [lastUpdateAfter, setLastUpdateAfter] = React.useState(
    new Date(1970, 1, 1)
  );

  const filteredQuests = quests.filter(
    (quest) =>
      matchSearchKeywords(quest, searchKeywords) &&
      matchSearchReward(quest, searchReward) &&
      matchHeroTypes(
        quest,
        selectedHeroTypeIndices.map((index) => heroTypes[index.row].id)
      ) &&
      matchQuestCategories(
        quest,
        selectedQuestCategoryIndices.map(
          (index) => questCategories[index.row].id
        )
      ) &&
      matchLastUpdateAfter(quest, lastUpdateAfter)
  );

  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lightBrown }}>
      <TopNavigation
        style={{ paddingTop: StatusBar.currentHeight }}
        title={(evaProps) => <Text {...evaProps}>QuestBoard</Text>}
      />

      <Input
        style={{
          backgroundColor: COLOR.lightBrown,
          borderBottomColor: COLOR.gray,
        }}
        placeholder="Search By Title / Description"
        value={searchKeywords}
        onChangeText={(nextValue) => {
          setSearchKeywords(nextValue);
        }}
      />

      <Input
        style={{
          backgroundColor: COLOR.lightBrown,
          borderBottomColor: COLOR.gray,
        }}
        placeholder="Search By Reward"
        value={searchReward}
        onChangeText={(nextValue) => {
          setSearchReward(nextValue);
        }}
      />

      <Select
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLOR.gray,
        }}
        selectedIndex={selectedHeroTypeIndices}
        placeholder="Hero Type(s)"
        multiSelect={true}
        onSelect={(index) => {
          setSelectedHeroTypeIndices(index);
        }}
        value={
          selectedHeroTypeIndices.length === 0
            ? ""
            : selectedHeroTypeIndices
                .map(
                  (selectedHeroTypeIndex) =>
                    heroTypes[selectedHeroTypeIndex.row].type
                )
                .join(", ")
        }
      >
        {heroTypes.map((heroType) => (
          <SelectItem key={heroType.id} title={heroType.type} />
        ))}
      </Select>

      <Select
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLOR.gray,
        }}
        selectedIndex={selectedQuestCategoryIndices}
        placeholder="Quest Category(s)"
        multiSelect={true}
        onSelect={(index) => {
          setSelectedQuestCategoryIndices(index);
        }}
        value={
          selectedQuestCategoryIndices.length === 0
            ? ""
            : selectedQuestCategoryIndices
                .map(
                  (selectedQuestCategoryIndex) =>
                    questCategories[selectedQuestCategoryIndex.row].category
                )
                .join(", ")
        }
      >
        {questCategories.map((questCategory) => (
          <SelectItem key={questCategory.id} title={questCategory.category} />
        ))}
      </Select>

      <Datepicker
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLOR.gray,
        }}
        date={lastUpdateAfter}
        onSelect={(nextDate) => setLastUpdateAfter(nextDate)}
      />

      <QuestBoardList navigation={navigation} quests={filteredQuests} />
    </View>
  );
}
