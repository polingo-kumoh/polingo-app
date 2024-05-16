// Inside FlashCardScreen.js

import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./FlashCardScreenStyle";
import { useAuth } from "../../../config/AuthContext";
import { useQuizData } from "./../../../hooks/useQuizData";
import QuizQuestion from "../../../components/component/QuizQuestion/QuizQuestion";
import QuizAnswer from "../../../components/component/QuizAnswer/QuizAnswer";

const FlashCardScreen = ({ navigation, route }) => {
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
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userResponses, setUserResponses] = useState([]);
  const progress = quizData
    ? ((currentQuestionIndex + 1) / quizData?.count) * 100
    : 0;

  const handleAnswer = (knowIt) => {
    let newResponse;
    if (knowIt) {
      // If "알아요" is selected, use the correct answer's option_id
      newResponse = {
        quiz_id: currentQuestionIndex + 1,
        selected_option_id:
          quizData.quizes[currentQuestionIndex].correct_answer.option_id,
      };
    } else {
      // If "몰라요" is selected, choose an incorrect option_id
      const correctId =
        quizData.quizes[currentQuestionIndex].correct_answer.option_id;
      const options = quizData.quizes[currentQuestionIndex].options.map(
        (opt) => opt.option_id
      );
      // Filter out the correct option id
      const incorrectOptions = options.filter((id) => id !== correctId);
      // Randomly select an incorrect option
      newResponse = {
        quiz_id: currentQuestionIndex + 1,
        selected_option_id:
          incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)],
      };
    }
    setSelectedAnswer(knowIt ? "알아요" : "몰라요");
    setUserResponses([...userResponses, newResponse]);

    setTimeout(() => {
      if (currentQuestionIndex < quizData?.count - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
      setSelectedAnswer(null);
    }, 500);
  };

  useEffect(() => {
    if (userResponses.length === quizData?.count) {
      navigation.navigate("ResultScreen", {
        answers: userResponses,
        quizData,
        defaultCategoryId,
      });
    }
  }, [userResponses, quizData]);

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

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <QuizQuestion
        question={quizData?.quizes[currentQuestionIndex]?.question}
      />
      <QuizAnswer
        answer="알아요"
        onPress={() => handleAnswer(true)}
        isSelected={selectedAnswer === "알아요"}
        isCorrect={selectedAnswer === "알아요"} // isCorrect based on selection
        showAnswer={selectedAnswer === "알아요"}
      />
      <QuizAnswer
        answer="몰라요"
        onPress={() => handleAnswer(false)}
        isSelected={selectedAnswer === "몰라요"}
        isCorrect={selectedAnswer !== "알아요"} // isCorrect if not "알아요"
        showAnswer={selectedAnswer === "몰라요"}
      />
    </View>
  );
};

export default FlashCardScreen;
