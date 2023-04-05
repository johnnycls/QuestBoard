import * as React from "react";
import { View } from "react-native";
import { Input, IndexPath, Select, SelectItem } from "@ui-kitten/components";
import HeroList from "./HeroList";
import { GENDERS, RATINGS } from "../general/SelfDefinedVariable";
import { COLOR } from "../../styles";

const matchSearch = (hero, searchValue) =>
  searchValue === "" ||
  hero.id == searchValue ||
  hero.name.toLowerCase().includes(searchValue.toLowerCase()) ||
  hero.description.toLowerCase().includes(searchValue.toLowerCase());

const matchGender = (hero, selectedGender) =>
  selectedGender === "Any Gender" || hero.gender === selectedGender;

const matchRating = (hero, selectedRating) => selectedRating === "Any Rating";

export default function HeroTab({ navigation, heroes, questId }) {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedGenderIndex, setSelectedGenderIndex] = React.useState(
    new IndexPath(0)
  );
  const [selectedRatingIndex, setSelectedRatingIndex] = React.useState(
    new IndexPath(0)
  );

  const selectedGender = GENDERS[selectedGenderIndex.row];
  const selectedRating = RATINGS[selectedRatingIndex.row];
  const filteredHeroes = heroes.filter(
    (hero) =>
      matchSearch(hero, searchValue) &&
      matchGender(hero, selectedGender) &&
      matchRating(hero, selectedRating)
  );

  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lightBrown }}>
      <Input
        style={{
          backgroundColor: COLOR.lightBrown,
          borderBottomColor: COLOR.gray,
        }}
        placeholder="Search By Name / Description"
        value={searchValue}
        onChangeText={(nextValue) => {
          setSearchValue(nextValue);
        }}
      />

      <Select
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLOR.gray,
        }}
        selectedIndex={selectedGenderIndex}
        onSelect={(index) => {
          setSelectedGenderIndex(index);
        }}
        value={GENDERS[selectedGenderIndex.row]}
      >
        {GENDERS.map((gender) => (
          <SelectItem key={gender} title={gender} />
        ))}
      </Select>

      <Select
        selectedIndex={selectedRatingIndex}
        onSelect={(index) => {
          setSelectedRatingIndex(index);
        }}
        value={RATINGS[selectedRatingIndex.row]}
      >
        {RATINGS.map((rating) => (
          <SelectItem key={rating} title={rating} />
        ))}
      </Select>

      <View style={{ height: "65%", backgroundColor: COLOR.lightBrown }}>
        <HeroList
          displayedHeroes={filteredHeroes}
          navigation={navigation}
          questId={questId}
        />
      </View>
    </View>
  );
}
