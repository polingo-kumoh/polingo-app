// Inside McqScreen.js

import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./McqScreenStyle";
import { useAuth } from "../../../config/AuthContext";
import { useQuizData } from "./../../../hooks/useQuizData";

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
  // const progress = quizData
  //   ? ((currentQuestionIndex + 1) / quizData.count) * 100
  //   : 0;
  const progress = ((currentQuestionIndex + 1) / 9) * 100;

  useEffect(() => {
    if (quizData) {
      console.log("Fetched quiz data:", quizData);
      // if (currentQuestionIndex >= quizData.count) {
      //   setCurrentQuestionIndex(0);
      // }
      if (currentQuestionIndex >= 9) {
        setCurrentQuestionIndex(0);
      }
    }
  }, [quizData, currentQuestionIndex]);

  useEffect(() => {
    console.log("Fetched quiz data:", quizData);
  }, [quizData]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  // if (isError) {
  //   return (
  //     <View style={styles.container}>
  //       <AppText>Error: {error.message}</AppText>
  //     </View>
  //   );
  // }

  const goToNextQuestion = () => {
    // if (currentQuestionIndex < quizData.count - 1) {
    //   setCurrentQuestionIndex(currentQuestionIndex + 1);
    // } else {
    //   // Handle end of quiz
    // }
    if (currentQuestionIndex < 9) {
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

      <TouchableOpacity onPress={goToNextQuestion}>
        <AppText>Next Question</AppText>
      </TouchableOpacity>
    </View>
  );
};

export default McqScreen;
