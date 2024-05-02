// Inside HomeScreen.js

import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Alert } from "react-native";
import AppText from "../../components/common/AppText";
import { useAuth } from "../../config/AuthContext";
import { styles } from "./HomeScreenStyle";
import { useUserData } from "../../hooks/useUserData";

import { Ionicons } from "@expo/vector-icons";
import HomeCarousel from "./../../components/component/HomeCarousel/index";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const HomeScreen = () => {
  const { token, logout } = useAuth();
  const { error, isError } = useUserData(token);
  const navigation = useNavigation();
  useEffect(() => {
    if (isError) {
      if (error.response && error.response.status === 401) {
        Alert.alert("세션 만료", "다시 로그인 해주세요.", [
          { text: "OK", onPress: () => logout() },
        ]);
      }
    }
  }, [isError, error, navigation]);

  const carouselImages = [
    {
      source: require("../../assets/images/비.jpg"),
      region: "구미시 옥계동",
      temperature: "7º",
      example_sentence1: "Can I have an umbrella, please",
      example_sentence1_translate: "우산 하나 주세요",
      example_sentence2: "It's raining a lot, so drive safely",
      example_sentence2_translate: "비가 많이오니 안전 운전 하세요",
    },
    {
      source: require("../../assets/images/눈.jpg"),
      region: "구미시 옥계동",
      temperature: "7º",
      example_sentence1: "Can I have an umbrella, please",
      example_sentence1_translate: "우산 하나 주세요",
      example_sentence2: "It's snowing a lot, so drive safely",
      example_sentence2_translate: "눈이 많이오니 안전 운전 하세요",
    },
  ];
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="person-circle"
          size={24}
          color="black"
          onPress={() => navigation.navigate("ProfileScreen")}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.carouselView}>
        <HomeCarousel items={carouselImages} />
      </View>
      <TouchableOpacity
        style={styles.translationBtn}
        onPress={() => navigation.navigate("TranslationScreen")}
      >
        <View>
          <AppText style={styles.transBtnText}>번역 시작하기</AppText>
          <AppText style={styles.transBtnSubText}>Polingo에서</AppText>
          <AppText style={styles.transBtnSubText}>원하는 언어 번역하기</AppText>
        </View>
        <MaterialCommunityIcons name="translate" size={60} color="white" />
      </TouchableOpacity>
      <View style={styles.itemsView}>
        <TouchableOpacity
          style={styles.itemView}
          onPress={() => navigation.navigate("NoteScreen")}
        >
          <MaterialIcons name="event-note" size={50} color="black" />
          <View style={styles.itemTextView}>
            <AppText style={styles.itemTitle}>나만의 단어장</AppText>
            <AppText style={styles.itemContent}>단어를 카테고리로</AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemView}
          onPress={() => navigation.navigate("QuestionScreen")}
        >
          <Entypo name="light-bulb" size={50} color="black" />
          <View style={styles.itemTextView}>
            <AppText style={styles.itemTitle}>나만의 문제집</AppText>
            <AppText style={styles.itemContent}>단어를 문제로</AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemView}
          onPress={() => navigation.navigate("NewsScreen")}
        >
          <FontAwesome name="newspaper-o" size={50} color="black" />
          <View style={styles.itemTextView}>
            <AppText style={styles.itemTitle}>오늘의 뉴스</AppText>
            <AppText style={styles.itemContent}>뉴스를 번역하여</AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemView}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={50}
            color="black"
          />
          <View style={styles.itemTextView}>
            <AppText style={styles.itemTitle}>상황별 회화집</AppText>
            <AppText style={styles.itemContent}>필요한 회화를 한번에</AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
