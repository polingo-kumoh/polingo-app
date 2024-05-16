// Inside BlinkingScreen.js

import React from "react";
import { View } from "react-native";
import AppText from "../../../components/common/AppText";

const BlinkingScreen = ({ navigation, route }) => {
  const { defaultCategoryId } = route.params;
  console.log(defaultCategoryId);
  return (
    <View>
      <AppText>BlinkingScreen</AppText>
    </View>
  );
};

export default BlinkingScreen;
