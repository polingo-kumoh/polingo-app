import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./BlinkingScreenStyle";
import { useAuth } from "../../../config/AuthContext";
import { useQuizData } from "./../../../hooks/useQuizData";
import QuizQuestion from "./../../../components/component/QuizQuestion/QuizQuestion";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";

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
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    return () => {
      sound.current && sound.current.unloadAsync();
    };
  }, []);

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

    const playMeaningSoundAndProceed = () => {
      handlePlaySound(true); // Play meaning sound
      setTimeout(proceedToNextQuestion, 2000); // Wait 2 seconds then proceed to the next question
    };

    const playWordSoundAndShowMeaning = () => {
      handlePlaySound(); // Play word sound
      setTimeout(() => {
        setShowMeaning(true);
        setTimeout(playMeaningSoundAndProceed, 2000); // Wait 2 seconds then play meaning sound and proceed
      }, 2000);
    };

    // Start the sequence for each new question
    if (!isPausedRef.current) {
      setShowMeaning(false);
      playWordSoundAndShowMeaning();
    }
  }, [currentQuestionIndex, quizData?.quizes.length]);

  // Adjust handlePlaySound to handle both word and meaning sounds
  const handlePlaySound = async (playMeaning = false) => {
    const { ttsUrl } = playMeaning
      ? quizData.quizes[currentQuestionIndex].correct_answer
      : quizData.quizes[currentQuestionIndex];
    try {
      await sound.current.unloadAsync();
      await sound.current.loadAsync({ uri: ttsUrl });
      await sound.current.playAsync();
    } catch (error) {
      console.error("Error loading or playing sound", error);
    }
  };

  const handleNextQuestion = () => {
    setShowMeaning(true);
    handlePlaySound(); // Play word sound
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
        onPress={() => handlePlaySound(true)}
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
