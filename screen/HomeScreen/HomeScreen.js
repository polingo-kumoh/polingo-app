// Inside HomeScreen.js

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Alert } from "react-native";
import AppText from "../../components/common/AppText";
import { useAuth } from "../../config/AuthContext";
import { styles } from "./HomeScreenStyle";
import { useUserData } from "../../hooks/useUserData";
import { useWeatherEx } from "../../hooks/useWeatherEx";
import { useDateEx } from "../../hooks/useDateEx";
import { useTimeEx } from "../../hooks/useTimeEx";
import { useWeekExData } from "../../hooks/useWeekExData";
import * as Location from "expo-location";

import { Ionicons } from "@expo/vector-icons";
import HomeCarousel from "./../../components/component/HomeCarousel/index";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const HomeScreen = () => {
  const { token, logout } = useAuth();
  const { data: userData, isError, error } = useUserData(token);
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const currentDate = new Date().toISOString().split("T")[0];
  const {
    data: weatherData,
    isError: isWeatherError,
    error: weatherError,
  } = useWeatherEx(
    token,
    userData?.default_language,
    location?.longitude,
    location?.latitude
  );
  const {
    data: dateData,
    isError: isDateError,
    error: dateError,
  } = useDateEx(token, userData?.default_language, "2024-01-01");

  const {
    data: timeData,
    isError: isTimeError,
    error: timeError,
  } = useTimeEx(token, userData?.default_language);

  const {
    data: weekData,
    isError: isWeekError,
    error: weekError,
  } = useTimeEx(token, userData?.default_language);

  useEffect(() => {
    if (isError) {
      if (error.response && error.response.status === 401) {
        Alert.alert("세션 만료", "다시 로그인 해주세요.", [
          { text: "OK", onPress: () => logout() },
        ]);
      }
    }
  }, [isError, error, navigation]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "위치 권한이 필요합니다.",
          "위치 정보를 사용하기 위해 권한이 필요합니다."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    requestLocationPermission();
  }, []);

  const getRandomSituation = (situations) => {
    const randomIndex = Math.floor(Math.random() * situations.length);
    return situations[randomIndex];
  };

  const randomTimeSituation = timeData
    ? getRandomSituation(timeData.situations)
    : null;

  const randomWeekSituation = weekData
    ? getRandomSituation(weekData.situations)
    : null;

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().split(" ")[0]; // 현재 시간을 HH:MM:SS 형식으로 반환
  };

  const getCurrentDayOfWeek = () => {
    const now = new Date();
    const daysOfWeek = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return daysOfWeek[now.getDay()]; // 현재 요일을 반환
  };
  const carouselImages =
    weatherData && dateData && randomTimeSituation && randomWeekSituation
      ? [
          {
            source: { uri: weatherData?.situation_image },
            region: weatherData?.city,
            temperature: `${weatherData?.temp}º`,
            example_sentence1: weatherData?.sentance,
            example_sentence1_translate: weatherData?.translate,
          },
          {
            source: { uri: dateData?.situation_image },
            region: weatherData?.city,
            temperature: currentDate,
            example_sentence1: dateData?.sentance,
            example_sentence1_translate: dateData?.translate,
          },
          {
            source: { uri: randomTimeSituation?.image_url },
            region: weatherData?.city,
            temperature: getCurrentTime(), // 현재 시간을 표시
            example_sentence1: randomTimeSituation?.sentence,
            example_sentence1_translate: randomTimeSituation?.translate,
          },
          {
            source: { uri: randomWeekSituation?.image_url },
            region: weatherData?.city,
            temperature: getCurrentDayOfWeek(), // 오늘의 요일을 표시
            example_sentence1: randomWeekSituation?.sentence,
            example_sentence1_translate: randomWeekSituation?.translate,
          },
        ]
      : [];

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
        <TouchableOpacity
          style={styles.itemView}
          onPress={() => navigation.navigate("SituationalExScreen")}
        >
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
