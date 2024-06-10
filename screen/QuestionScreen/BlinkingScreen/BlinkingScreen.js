import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./BlinkingScreenStyle";
import { useAuth } from "../../../config/AuthContext";
import { useQuizData } from "./../../../hooks/useQuizData";
import QuizQuestion from "./../../../components/component/QuizQuestion/QuizQuestion";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";

const BlinkingScreen = ({ navigation, route }) => {
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
  const [showMeaning, setShowMeaning] = useState(false);
  const isPausedRef = useRef(false);
  const progress = quizData
    ? ((currentQuestionIndex + 1) / quizData?.count) * 100
    : 0;

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

  useEffect(() => {
    const proceedToNextQuestion = () => {
      if (currentQuestionIndex < quizData?.quizes.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentQuestionIndex(0); // Optionally loop back to the first question
      }
    };

    const showMeaningAndProceed = () => {
      setShowMeaning(true);
      setTimeout(proceedToNextQuestion, 2000); // Wait 2 seconds then proceed to the next question
    };

    const showQuestionAndMeaning = () => {
      setTimeout(() => {
        setShowMeaning(true);
        setTimeout(showMeaningAndProceed, 2000); // Wait 2 seconds then show meaning and proceed
      }, 2000);
    };

    // Start the sequence for each new question
    if (!isPausedRef.current) {
      setShowMeaning(false);
      showQuestionAndMeaning();
    }
  }, [currentQuestionIndex, quizData?.quizes.length]);

  const handleNextQuestion = () => {
    setShowMeaning(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <QuizQuestion
        question={quizData?.quizes[currentQuestionIndex]?.question}
        showMeaning={showMeaning}
        meaning={
          showMeaning
            ? quizData.quizes[currentQuestionIndex].correct_answer.text
            : ""
        }
      />
      <View style={styles.iconsView}>
        {isPausedRef.current ? (
          <TouchableOpacity
            onPress={() => {
              isPausedRef.current = false;
            }}
          >
            <AntDesign name="playcircleo" size={40} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              isPausedRef.current = true;
            }}
          >
            <Feather name="pause-circle" size={40} color="black" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleNextQuestion}>
          <MaterialIcons name="double-arrow" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlinkingScreen;
