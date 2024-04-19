// Inside HomeScreen.js

import React from "react";
import { View } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./NewsScreenStyle";

const NewsScreen = () => {
  return (
    <View style={styles.container}>
      <AppText>뉴스 페이지</AppText>
    </View>
  );
};

export default NewsScreen;
