// navigation/MainNavigator.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen/ProfileScreen";
import ChangeLanguageScreen from "../screen/ProfileScreen/ChangeLanguage/ChangeLanguageScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="ChangeLanguageScreen"
        component={ChangeLanguageScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
