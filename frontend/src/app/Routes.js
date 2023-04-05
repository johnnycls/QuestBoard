import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ChatPage from "../components/chat/ChatPage";
import ContractPage from "../components/contract/ContractPage";
import DashboardPage from "../components/dashboard/DashboardPage";
import DispatcherProfilePage from "../components/profile/DispatcherProfilePage";
import DispatcherOwnProfilePage from "../components/profile/DispatcherOwnProfilePage";
import HeroBottomBar from "../components/general/HeroBottomBar";
import HeroesPage from "../components/heroes/HeroesPage";
import HeroHistoryPage from "../components/heroHome/HeroHistoryPage";
import HeroHomePage from "../components/heroHome/HeroHomePage";
import HeroOwnProfilePage from "../components/profile/HeroOwnProfilePage";
import HeroProfilePage from "../components/profile/HeroProfilePage";
import QuestBoardPage from "../components/dashboard/QuestBoardPage";
import HistoryPage from "../components/dashboard/HistoryPage";
import LoginPage from "../components/login/LoginPage";
import QuestHeroesPage from "../components/heroes/QuestHeroesPage";
import QuestPage from "../components/quest/QuestPage";
import QuestDetailPage from "../components/questDetail/QuestDetailPage";
import RegistrationPage from "../components/registration/RegistrationPage";
import SelectRolePage from "../components/selectRole/SelectRolePage";
import BottomBar from "../components/general/BottomBar";

const Stack = createNativeStackNavigator();
const { Navigator, Screen } = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomBar {...props} />}
    >
      <Screen name="Dashboard" component={DashboardPage} />
      <Screen name="Heroes" component={HeroesPage} />
      <Screen name="History" component={HistoryPage} />
      <Screen
        name="DispatcherOwnProfile"
        component={DispatcherOwnProfilePage}
      />
    </Navigator>
  );
}

function HeroBottomNavigator() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <HeroBottomBar {...props} />}
    >
      <Screen name="HeroHome" component={HeroHomePage} />
      <Screen name="QuestBoard" component={QuestBoardPage} />
      <Screen name="HeroHistory" component={HeroHistoryPage} />
      <Screen name="HeroOwnProfile" component={HeroOwnProfilePage} />
    </Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Chat" component={ChatPage} />
        <Stack.Screen name="Contract" component={ContractPage} />
        <Stack.Screen
          name="DispatcherProfile"
          component={DispatcherProfilePage}
        />
        <Stack.Screen
          name="HeroBottomNavigator"
          component={HeroBottomNavigator}
        />
        <Stack.Screen name="HeroProfile" component={HeroProfilePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Quest" component={QuestPage} />
        <Stack.Screen name="QuestDetail" component={QuestDetailPage} />
        <Stack.Screen name="QuestHeroes" component={QuestHeroesPage} />
        <Stack.Screen name="Registration" component={RegistrationPage} />
        <Stack.Screen name="SelectRole" component={SelectRolePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
