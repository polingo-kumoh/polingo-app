// navigation/MainNavigator.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen/ProfileScreen";
import ChangeLanguageScreen from "../screen/ProfileScreen/ChangeLanguage/ChangeLanguageScreen";
import TranslationScreen from "../screen/TranslationScreen/TranslationScreen";
import NewsScreen from "./../screen/NewsScreen/NewsScreen";
import NewsDetailScreen from "./../screen/NewsScreen/NewsDetailScreen/NewsDetailScreen";
import NoteScreen from "../screen/NoteScreen/NoteScreen";
import CategoryEditScreen from "../screen/NoteScreen/CategoryEditScreen/CategoryEditScreen";
import WordEditScreen from "./../screen/NoteScreen/WordEditScreen/WordEditScreen";
import CategoryAddScreen from "../screen/NoteScreen/CategoryAddScreen/CategoryAddScreen";
import WordAddScreen from "../screen/NewsScreen/WordAddScreen/WordAddScreen";
import QuestionScreen from "../screen/QuestionScreen/QuestionScreen";

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
      <Stack.Screen
        name="TranslationScreen"
        component={TranslationScreen}
        options={{ headerTitle: "번역 하기" }}
      />
      <Stack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ headerTitle: "뉴스로 배우기" }}
      />
      <Stack.Screen
        name="NewsDetailScreen"
        component={NewsDetailScreen}
        options={{ headerTitle: "뉴스로 배우기" }}
      />
      <Stack.Screen
        name="NoteScreen"
        component={NoteScreen}
        options={{ headerTitle: "단어장" }}
      />
      <Stack.Screen
        name="CategoryEditScreen"
        component={CategoryEditScreen}
        options={{ headerTitle: "카테고리 편집" }}
      />
      <Stack.Screen
        name="WordEditScreen"
        component={WordEditScreen}
        options={{ headerTitle: "단어 편집" }}
      />
      <Stack.Screen
        name="CategoryAddScreen"
        component={CategoryAddScreen}
        options={{ headerTitle: "카테고리 추가" }}
      />
      <Stack.Screen
        name="WordAddScreen"
        component={WordAddScreen}
        options={{ headerTitle: "단어 추가" }}
      />
      <Stack.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        options={{ headerTitle: "문제집" }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
