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
    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrentQuestionIndex((prevIndex) =>
          prevIndex < quizData?.quizes.length - 1 ? prevIndex + 1 : 0
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [quizData?.quizes.length]); // quizData의 질문 개수에만 의존

  const handlePause = () => {
    isPausedRef.current = !isPausedRef.current;
  };
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <QuizQuestion
        question={quizData?.quizes[currentQuestionIndex]?.question}
      />
      <View style={styles.iconsView}>
        {isPausedRef.current ? (
          <TouchableOpacity onPress={handlePause}>
            <AntDesign name="playcircleo" size={40} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handlePause}>
            <Feather name="pause-circle" size={40} color="black" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
        >
          <MaterialIcons name="double-arrow" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlinkingScreen;
