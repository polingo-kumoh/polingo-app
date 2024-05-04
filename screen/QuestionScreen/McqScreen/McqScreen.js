// Inside McqScreen.js

import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./McqScreenStyle";
import { useAuth } from "../../../config/AuthContext";
import { useQuizData } from "./../../../hooks/useQuizData";
import QuizQuestion from "../../../components/component/QuizQuestion/QuizQuestion";
import QuizAnswer from "../../../components/component/QuizAnswer/QuizAnswer";

const McqScreen = ({ navigation, route }) => {
  const { defaultCategoryId } = route.params;
  const { token } = useAuth();
  const {
    data: quizData,
    isLoading,
    isError,
    error,
  } = useQuizData(token, defaultCategoryId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const progress = quizData
    ? ((currentQuestionIndex + 1) / quizData?.count) * 100
    : 0;

  useEffect(() => {
    if (quizData) {
      if (currentQuestionIndex >= quizData?.count) {
        setCurrentQuestionIndex(0); //또는 결과로 이동
      }
    }
  }, [quizData, currentQuestionIndex]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          <AppText style={styles.quizCount}>
            {currentQuestionIndex + 1}/{quizData?.count}
          </AppText>
        </View>
      ),
    });
  }, [navigation, currentQuestionIndex, quizData]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <AppText>Error: {error.message}</AppText>
      </View>
    );
  }

  const goToNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < quizData?.count - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 퀴즈 종료 로직
    }
  };

  const handleAnswerPress = (optionId) => {
    setSelectedOption(optionId);
    setShowAnswer(true);
    setTimeout(() => {
      goToNextQuestion();
      setShowAnswer(false); // 다음 질문으로 넘어가면서 결과 표시 리셋
    }, 1000); // 1초 후 다음 질문으로 자동 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <QuizQuestion
        question={quizData?.quizes[currentQuestionIndex].question}
      />
      {quizData?.quizes[currentQuestionIndex].options.map((option, index) => (
        <QuizAnswer
          key={index}
          answer={option.text}
          onPress={() => handleAnswerPress(option.option_id)}
          isSelected={selectedOption === option.option_id}
          isCorrect={
            option.option_id ===
            quizData.quizes[currentQuestionIndex].correct_id
          }
          showAnswer={showAnswer}
        />
      ))}
    </View>
  );
};

export default McqScreen;
