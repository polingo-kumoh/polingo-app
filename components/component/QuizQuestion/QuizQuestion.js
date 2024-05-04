// Inside QuizQuestion.js

import React from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./QuizQuestionStyle";
import { AntDesign } from "@expo/vector-icons";

const QuizQuestion = ({ question }) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.question}>{question}</AppText>
      <TouchableOpacity style={styles.speaker}>
        <AntDesign name="sound" size={24} color="#aaa" />
      </TouchableOpacity>
    </View>
  );
};

export default QuizQuestion;
