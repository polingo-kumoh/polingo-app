import React from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./QuizQuestionStyle";
import { AntDesign } from "@expo/vector-icons";

const QuizQuestion = ({ question, showMeaning, meaning, onPress }) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.question}>{question}</AppText>
      {showMeaning && <AppText style={styles.answer}>{meaning}</AppText>}
      <TouchableOpacity style={styles.speaker} onPress={onPress}>
        <AntDesign name="sound" size={24} color="#aaa" />
      </TouchableOpacity>
    </View>
  );
};

export default QuizQuestion;
