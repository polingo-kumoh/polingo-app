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
  const progress = quizData
    ? ((currentQuestionIndex + 1) / quizData.count) * 100
    : 0;

  useEffect(() => {
    if (quizData) {
      if (currentQuestionIndex >= quizData.count) {
        setCurrentQuestionIndex(0);
      }
    }
  }, [quizData, currentQuestionIndex]);

  useEffect(() => {
    console.log("Fetched quiz data:", quizData);
  }, [quizData]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          <AppText style={styles.quizCount}>
            {currentQuestionIndex + 1}/{quizData.count}
          </AppText>
        </View>
      ),
    });
  }, [navigation]);

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
    if (currentQuestionIndex < quizData.count - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle end of quiz
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <QuizQuestion />
      <QuizAnswer />
      <QuizAnswer />
      <QuizAnswer />
      <QuizAnswer />
      {/* <TouchableOpacity onPress={goToNextQuestion}>
        <AppText>Next Question</AppText>
      </TouchableOpacity> */}
    </View>
  );
};

export default McqScreen;
