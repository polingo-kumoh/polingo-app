import React from "react";
import { View } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./QuizQuestionStyle";

const QuizQuestion = ({ question, showMeaning, meaning, onPress }) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.question}>{question}</AppText>
      {showMeaning && <AppText style={styles.answer}>{meaning}</AppText>}
    </View>
  );
};

export default QuizQuestion;
