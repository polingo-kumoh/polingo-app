import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./DictationScreenStyle";
import { useAuth } from "../../../config/AuthContext";
import { useQuizData } from "./../../../hooks/useQuizData";
import { useWordData } from "./../../../hooks/useWordData";
import QuizQuestion from "./../../../components/component/QuizQuestion/QuizQuestion";

const DictationScreen = ({ navigation, route }) => {
  const { defaultCategoryId } = route.params;
  const { token } = useAuth();
  const {
    data: quizData,
    isLoading: quizLoading,
    isError: quizError,
    error: quizFetchError,
    refetch: refetchQuiz,
  } = useQuizData(token, defaultCategoryId);

  const {
    data: wordData,
    isLoading: wordLoading,
    isError: wordError,
    error: wordFetchError,
  } = useWordData(token, defaultCategoryId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);

  const progress = quizData
    ? ((currentQuestionIndex + 1) / quizData?.count) * 100
    : 0;

  useEffect(() => {
    refetchQuiz();
    setCurrentQuestionIndex(0);
    setUserInput("");
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

  const getQuestionDescription = () => {
    const currentQuestion =
      quizData?.quizes[currentQuestionIndex]?.question.toLowerCase();
    const wordItem = wordData?.words.find(
      (word) => word.word.toLowerCase() === currentQuestion
    );
    return wordItem ? wordItem.description : "";
  };

  const handleAnswerCheck = () => {
    const currentQuestion =
      quizData?.quizes[currentQuestionIndex]?.question.toLowerCase();
    const isCorrect = currentQuestion === userInput.trim().toLowerCase();

    const newAnswer = {
      quiz_id: quizData?.quizes[currentQuestionIndex]?.id,
      selected_option_id: isCorrect
        ? quizData?.quizes[currentQuestionIndex]?.correct_id
        : null,
      isCorrect: isCorrect,
    };
    const updatedAnswers = [...answers, newAnswer];

    setAnswers(updatedAnswers);
    setAnsweredCorrectly(isCorrect);
    setShowAnswer(true);

    setTimeout(() => {
      goToNextQuestion(updatedAnswers);
      setShowAnswer(false);
      setAnsweredCorrectly(null);
    }, 2000);
  };

  const handleTimeUp = () => {
    if (quizData?.quizes && quizData.quizes[currentQuestionIndex]) {
      const currentQuestion = quizData.quizes[currentQuestionIndex];
      const newAnswer = {
        quiz_id: currentQuestion.id,
        selected_option_id: null,
        isCorrect: false,
      };
      const updatedAnswers = [...answers, newAnswer];

      setAnswers(updatedAnswers);
      setShowAnswer(true);

      setTimeout(() => {
        goToNextQuestion(updatedAnswers);
        setShowAnswer(false);
      }, 2000);
    } else {
      console.log("No valid question found");
    }
  };

  const goToNextQuestion = (updatedAnswers) => {
    setUserInput("");
    if (currentQuestionIndex < quizData?.count - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate("ResultScreen", {
        answers: updatedAnswers,
        quizData,
        defaultCategoryId,
      });
    }
  };

  if (quizLoading || wordLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (quizError) {
    return (
      <View style={styles.container}>
        <AppText>Error: {quizFetchError.message}</AppText>
      </View>
    );
  }

  if (wordError) {
    return (
      <View style={styles.container}>
        <AppText>Error: {wordFetchError.message}</AppText>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <QuizQuestion question={getQuestionDescription()} />
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="단어의 철자를 입력하세요"
        />
        <TouchableOpacity style={styles.button} onPress={handleAnswerCheck}>
          <AppText style={styles.buttonText}>확인</AppText>
        </TouchableOpacity>
        {showAnswer && (
          <AppText
            style={[
              styles.answerText,
              {
                color: answeredCorrectly ? "blue" : "red",
              },
            ]}
          >
            {answeredCorrectly
              ? "정답 !"
              : `틀렸습니다. \n정답 : ${quizData?.quizes[currentQuestionIndex]?.question}`}
          </AppText>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DictationScreen;
