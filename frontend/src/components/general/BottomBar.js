import * as React from "react";
import { Text } from "react-native";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { COLOR } from "../../styles";

export default function BottomBar({ navigation, state }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation
      style={{
        paddingBottom: 10,
        backgroundColor: COLOR.brown,
      }}
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab
        title={() => <Text style={{ color: COLOR.white }}>Dashboard</Text>}
        icon={(props) => <Icon {...props} name="pie-chart-outline" />}
      />
      <BottomNavigationTab
        title={() => <Text style={{ color: COLOR.white }}>Heroes</Text>}
        icon={(props) => <Icon {...props} name="people-outline" />}
      />
      <BottomNavigationTab
        title={() => <Text style={{ color: COLOR.white }}>History</Text>}
        icon={(props) => <Icon {...props} name="archive-outline" />}
      />
      <BottomNavigationTab
        title={() => <Text style={{ color: COLOR.white }}>Profile</Text>}
        icon={(props) => <Icon {...props} name="person-outline" />}
      />
    </BottomNavigation>
  );
}
