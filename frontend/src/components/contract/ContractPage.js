import * as React from "react";
import { View, StatusBar } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
  Card,
  Text,
  TopNavigation,
  CheckBox,
  IndexPath,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { getContract, updateContract } from "../../slices/contractSlice";
import { getComment, updateComment } from "../../slices/commentSlice";
import { COLOR, styles } from "../../styles";
import { updateQuest } from "../../slices/questsSlice";

export const RATINGS = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0];

export default function ContractPage({ route, navigation }) {
  // "id" refers to the id of the contract
  const { id, questId, isHero } = route.params;
  const dispatch = useDispatch();

  // For contract
  const [description, setDescription] = React.useState("");
  const [reward, setReward] = React.useState("");
  const [status, setStatus] = React.useState(0);
  const [commentText, setCommentText] = React.useState("");
  const [ratingIndex, setRatingIndex] = React.useState(null);

  // select contract
  const contract = useSelector((state) =>
    state.contract.contracts.find((contract) => contract.id === id)
  );
  // select comment
  const [commentId, setCommentId] = React.useState(-1);
  const comment = useSelector((state) =>
    state.comment.comments.find((comment) => comment.id === commentId)
  );
  // const comment = useSelector((state) => state.comment.comment);
  const quest = useSelector((state) =>
    state.quests.quests.find((quest) => quest.id === questId)
  );

  React.useEffect(() => {
    if (contract) {
      setDescription(contract.description);
      setReward(contract.reward);
      setStatus(contract.status);
      // set comment Id
      setCommentId(contract.comment);
    }
  }, [contract]);

  React.useEffect(() => {
    if (comment) {
      setCommentText(comment.description);
      if (comment.ratingIndex !== -1) {
        setRatingIndex(new IndexPath(comment.ratingIndex));
      }
    }
  }, [comment]);

  return (
    <View style={{ height: "100%", backgroundColor: COLOR.lightBrown }}>
      <TopNavigation
        style={{
          paddingTop: StatusBar.currentHeight,
        }}
        title={(evaProps) => <Text {...evaProps}>Contract</Text>}
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
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            {quest.title}
          </Text>

          {!isHero && status === 0 ? (
            <Input
              style={[styles.input, { marginTop: "2%" }]}
              textStyle={{ minHeight: "20%", textAlignVertical: "top" }}
              placeholder="description"
              value={description}
              onChangeText={(nextValue) => setDescription(nextValue)}
              multiline
            />
          ) : (
            <Text style={[styles.input, { marginTop: "2%", minHeight: "20%" }]}>
              {description}
            </Text>
          )}

          {!isHero && status === 0 ? (
            <Input
              label={() => <Text>Reward</Text>}
              style={[styles.input, { marginTop: "4%" }]}
              placeholder="reward"
              value={reward}
              onChangeText={(nextValue) => setReward(nextValue)}
              multiline
            />
          ) : (
            <Text style={[styles.input, { marginTop: "4%" }]}>{reward}</Text>
          )}

          <Text style={{ fontSize: 16, marginTop: "4%" }}>Signature</Text>
          {/* dispatcher agrees */}
          <CheckBox
            style={{ marginTop: "2%" }}
            checked={status >= 1}
            disabled={quest.isEnded || contract.status !== 0 || isHero}
            onChange={(nextChecked) => {
              if (status === 0) {
                setStatus(1);
              } else {
                setStatus(0);
              }
            }}
          >
            {(evaProps) => (
              <Text {...evaProps} style={{ fontSize: 16 }}>
                {"  Dispatcher Agree"}
              </Text>
            )}
          </CheckBox>
          {/* hero agrees */}
          <CheckBox
            style={{ marginTop: "2%" }}
            checked={status >= 2}
            disabled={contract.status !== 1 || !isHero}
            onChange={(nextChecked) => {
              if (status === 1) {
                setStatus(2);
              } else setStatus(1);
            }}
          >
            {(evaProps) => (
              <Text {...evaProps} style={{ fontSize: 16 }}>
                {"  Hero Agree"}
              </Text>
            )}
          </CheckBox>
          {/* reward received */}
          <CheckBox
            style={{ marginTop: "2%" }}
            checked={status >= 3}
            disabled={contract.status !== 2 || !isHero}
            onChange={(nextChecked) => {
              if (status === 2) {
                setStatus(3);
              } else setStatus(2);
            }}
          >
            {(evaProps) => (
              <Text {...evaProps} style={{ fontSize: 16 }}>
                {"  Reward Received"}
              </Text>
            )}
          </CheckBox>

          <Input
            style={[styles.input, { marginTop: "4%" }]}
            placeholder="Comment"
            value={commentText}
            textStyle={{ minHeight: "15%", textAlignVertical: "top" }}
            onChangeText={(nextValue) => setCommentText(nextValue)}
            multiline
            disabled={contract.status !== 3 || isHero}
          />

          <Select
            style={{ marginTop: "2%" }}
            placeholder="Rating"
            selectedIndex={ratingIndex}
            onSelect={(index) => {
              setRatingIndex(index);
            }}
            value={!ratingIndex ? "" : RATINGS[ratingIndex.row]}
            disabled={contract.status !== 3 || isHero}
          >
            {RATINGS.map((rating) => (
              <SelectItem key={rating} title={rating} />
            ))}
          </Select>
          {/* save the result */}
          {!quest.isEnded && (
            <>
              <Button
                style={[styles.button, { marginTop: "4%" }]}
                onPress={() => {
                  // if dispatcher is not allowed to give comments
                  if (contract.status !== 3) {
                    dispatch(
                      updateContract({
                        ...contract,
                        description,
                        reward,
                        status,
                      })
                    );
                  } else {
                    dispatch(
                      updateContract({
                        ...contract,
                        description,
                        reward,
                        status: status + 1,
                      })
                    );
                    dispatch(
                      updateComment({
                        ...comment,
                        description: commentText,
                        ratingIndex: ratingIndex ? ratingIndex.row : -1,
                      })
                    );
                    dispatch(updateQuest({ ...quest, isEnded: true }));
                    navigation.navigate("Dashboard");
                  }
                }}
              >
                Save
              </Button>
              <Button
                style={[
                  styles.button,
                  { marginTop: "2%", backgroundColor: COLOR.red },
                ]}
                onPress={() => {
                  navigation.navigate("Quest", { id: questId, isEnded: false });
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </Card>
      </View>
    </View>
  );
}
