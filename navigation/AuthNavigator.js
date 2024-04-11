// navigation/AuthNavigator.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/LoginScreen/LoginScreen";
import OAuthLoginScreen from "../screen/OAuthLoginScreen/OAuthLoginScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false, // 여기서 모든 스크린의 헤더를 숨깁니다.
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OAuthLoginScreen" component={OAuthLoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
