// Inside TranslationScreen.js

import React from "react";
import { View } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./TranslationScreenStyle";

const TranslationScreen = () => {
  return (
    <View style={styles.container}>
      <AppText>번역하기</AppText>
    </View>
  );
};

export default TranslationScreen;
