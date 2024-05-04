// Inside QuizAnswer.js

import React from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./QuizAnswerStyle";

const QuizAnswer = ({ answer, onPress, isSelected, isCorrect, showAnswer }) => {
  const getStyle = () => {
    if (showAnswer) {
      if (isCorrect) {
        return [styles.container, styles.correct]; // 정답일 때 초록색
      } else if (isSelected && !isCorrect) {
        return [styles.container, styles.incorrect]; // 선택된 오답일 때 빨간색
      }
    }
    return styles.container; // 기본 스타일
  };

  const getAnswerStyle = () => {
    if (showAnswer) {
      return [styles.selectedAnswer];
    }

    return [styles.answer];
  };

  return (
    <TouchableOpacity style={getStyle()} onPress={onPress}>
      <AppText style={getAnswerStyle()}>{answer}</AppText>
    </TouchableOpacity>
  );
};

export default QuizAnswer;
