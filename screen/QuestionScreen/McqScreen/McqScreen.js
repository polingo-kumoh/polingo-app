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
    refetch,
  } = useQuizData(token, defaultCategoryId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);

  const progress = quizData
    ? ((currentQuestionIndex + 1) / quizData?.count) * 100
    : 0;

  useEffect(() => {
    refetch();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setAnswers([]);
  }, [route.params]);

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
      // 마지막 문제 후 결과 페이지로 이동
      navigation.navigate("ResultScreen", {
        answers,
        quizData,
        defaultCategoryId,
      });
    }
  };

  const handleAnswerPress = (optionId) => {
    setSelectedOption(optionId);
    setShowAnswer(true);

    const updatedAnswers = [...answers];
    const answerIndex = updatedAnswers.findIndex(
      (answer) => answer.quiz_id === quizData.quizes[currentQuestionIndex].id
    );

    if (answerIndex > -1) {
      updatedAnswers[answerIndex] = {
        quiz_id: quizData.quizes[currentQuestionIndex].id,
        selected_option_id: optionId,
      };
    } else {
      updatedAnswers.push({
        quiz_id: quizData.quizes[currentQuestionIndex].id,
        selected_option_id: optionId,
      });
    }

    setAnswers(updatedAnswers);

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
        question={quizData?.quizes[currentQuestionIndex]?.question}
      />
      {quizData?.quizes[currentQuestionIndex]?.options?.map((option, index) => (
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
