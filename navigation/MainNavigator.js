// navigation/MainNavigator.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen/ProfileScreen";
import ChangeLanguageScreen from "../screen/ProfileScreen/ChangeLanguage/ChangeLanguageScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Noto-Sans-Bold",
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: "POLINGO",
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "프로필" }}
      />
      <Stack.Screen
        name="ChangeLanguageScreen"
        component={ChangeLanguageScreen}
        options={{ headerTitle: "기본 언어 설정" }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
