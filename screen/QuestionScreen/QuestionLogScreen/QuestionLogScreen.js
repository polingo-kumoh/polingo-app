// Inside QuestionLogScreen.js

import React from "react";
import { View } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./QuestionLogScreenStyle";

const QuestionLogScreen = () => {
  return (
    <View style={styles.container}>
      <AppText>QuestionLogScreen</AppText>
    </View>
  );
};

export default QuestionLogScreen;
