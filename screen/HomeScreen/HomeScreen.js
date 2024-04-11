// Inside HomeScreen.js

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";
import AppText from "../../components/common/AppText";
import { useAuth } from "../../config/AuthContext";
import { styles } from "./HomeScreenStyle";

import { Ionicons } from "@expo/vector-icons";
import HomeCarousel from "./../../components/component/HomeCarousel/index";

const HomeScreen = () => {
  const { token } = useAuth();
  const navigation = useNavigation();

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
      <HomeCarousel items={carouselImages} />
    </View>
  );
};

export default HomeScreen;
