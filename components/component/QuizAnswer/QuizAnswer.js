// Inside QuizAnswer.js

import React from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./QuizAnswerStyle";

const QuizAnswer = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <AppText style={styles.answer}>QuizAnswer</AppText>
    </TouchableOpacity>
  );
};

export default QuizAnswer;
