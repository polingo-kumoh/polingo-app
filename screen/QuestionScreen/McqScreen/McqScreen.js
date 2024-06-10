import React, { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator } from "react-native";
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
  const [timeLeft, setTimeLeft] = useState(10); // 질문당 10초 제한

  const timerRef = useRef(null);
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
    if (quizData) {
      startTimer();
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

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setTimeLeft(10); // 질문당 10초로 초기화

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0; // 0초로 설정하여 화면에 0초 표시
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleTimeUp = () => {
    if (quizData?.quizes && quizData.quizes[currentQuestionIndex]) {
      // 오답으로 처리
      const currentQuestion = quizData.quizes[currentQuestionIndex];
      const incorrectOption = currentQuestion.options.find(
        (option) => option.option_id !== currentQuestion.correct_id
      );

      const newAnswer = {
        quiz_id: currentQuestion.id,
        selected_option_id: incorrectOption.option_id, // correct_id가 아닌 id값 설정
      };
      const updatedAnswers = [...answers, newAnswer];

      setAnswers(updatedAnswers);
      setShowAnswer(true); // 정답 표시

      // 일정 시간 후 다음 질문으로 이동
      setTimeout(() => {
        goToNextQuestion(updatedAnswers);
        setShowAnswer(false); // 다음 질문으로 넘어가면서 결과 표시 리셋
      }, 2000); // 2초 후 다음 질문으로 이동
    } else {
      console.log("No valid question found");
    }
  };

  const goToNextQuestion = (updatedAnswers) => {
    setSelectedOption(null);
    if (currentQuestionIndex < quizData?.count - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 마지막 문제 후 결과 페이지로 이동, 업데이트된 답변 배열 전달
      navigation.navigate("ResultScreen", {
        answers: updatedAnswers,
        quizData,
        defaultCategoryId,
        type: "MCQ",
      });
    }
  };

  const handleAnswerPress = (optionId) => {
    setSelectedOption(optionId);
    setShowAnswer(true);

    // answers 배열을 먼저 업데이트
    const newAnswer = {
      quiz_id: quizData?.quizes[currentQuestionIndex]?.id,
      selected_option_id: optionId,
    };
    const updatedAnswers = answers.some(
      (answer) => answer.quiz_id === newAnswer.quiz_id
    )
      ? answers.map((answer) =>
          answer.quiz_id === newAnswer.quiz_id ? newAnswer : answer
        )
      : [...answers, newAnswer];

    setAnswers(updatedAnswers);

    // 지연 후 다음 질문으로 넘어가도록 설정
    setTimeout(() => {
      goToNextQuestion(updatedAnswers); // 업데이트된 답변 배열을 전달
      setShowAnswer(false); // 다음 질문으로 넘어가면서 결과 표시 리셋
    }, 1000); // 1초 후 다음 질문으로 자동 이동
  };

  const getTimerTextStyle = () => {
    if (timeLeft >= 7) {
      return styles.timerGreen;
    } else if (timeLeft >= 4) {
      return styles.timerYellow;
    } else {
      return styles.timerRed;
    }
  };

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
      <AppText style={[styles.timerText, getTimerTextStyle()]}>
        {timeLeft}
      </AppText>
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
            quizData?.quizes[currentQuestionIndex]?.correct_id
          }
          showAnswer={showAnswer}
        />
      ))}
    </View>
  );
};

export default McqScreen;
