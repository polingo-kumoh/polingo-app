// Inside ResultScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./ResultScreenStyle";
import { useAuth } from "./../../../config/AuthContext";
import { useSubmitAnswer } from "../../../hooks/useSubmitAnswer";
import ResultWord from "../../../components/component/ResultWord/ResultWord";
import { Ionicons } from "@expo/vector-icons";

const ResultScreen = ({ navigation, route }) => {
  const { answers, quizData, defaultCategoryId } = route.params;
  const { token } = useAuth();
  const {
    mutate: submitAnswer,
    isLoading,
    isError,
    data,
    error,
  } = useSubmitAnswer();
  const [allWords, setAllWords] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    if (answers) {
      // 전체 답안을 제출
      submitAnswer({ token, answers });
    }
  }, [answers, token, submitAnswer]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("McqScreen", { defaultCategoryId })
          }
        >
          <AppText style={styles.headerButton}>다시 하기</AppText>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("QuestionScreen")}>
          <Ionicons name="close-circle" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, quizData]);

  useEffect(() => {
    if (data && quizData) {
      const allWordsArray = quizData.quizes.map((quiz) => ({
        id: quiz.id,
        original_text: quiz.question,
        translated_text: quiz.options.find(
          (o) => o.option_id === quiz.correct_id
        ).text,
      }));

      const correctWordsArray = data.correct_quiz_ids.map((id) => {
        const quiz = quizData.quizes.find((q) => q.id === id);
        return {
          id: quiz.id,
          original_text: quiz.question,
          translated_text: quiz.options.find(
            (o) => o.option_id === quiz.correct_id
          ).text,
        };
      });

      const incorrectWordsArray = data.incorrect_quiz_ids.map((id) => {
        const quiz = quizData.quizes.find((q) => q.id === id);
        return {
          id: quiz.id,
          original_text: quiz.question,
          translated_text: quiz.options.find(
            (o) => o.option_id === quiz.correct_id
          ).text,
        };
      });

      setAllWords(allWordsArray);
      setCorrectWords(correctWordsArray);
      setIncorrectWords(incorrectWordsArray);
    }
  }, [data, quizData]);

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  const getTabStyle = (tabName) => {
    return selectedTab === tabName ? styles.selectedTabItem : styles.tabItem;
  };

  const renderWords = () => {
    switch (selectedTab) {
      case "all":
        return allWords.map((word, index) => (
          <ResultWord
            key={index}
            word={word.original_text}
            trans={word.translated_text}
          />
        ));
      case "correct":
        return correctWords.map((word, index) => (
          <ResultWord
            key={index}
            word={word.original_text}
            trans={word.translated_text}
          />
        ));
      case "incorrect":
        return incorrectWords.map((word, index) => (
          <ResultWord
            key={index}
            word={word.original_text}
            trans={word.translated_text}
          />
        ));
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <AppText>Error submitting answers: {error.message}</AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabView}>
        <TouchableOpacity onPress={() => handleTabSelect("all")}>
          <AppText style={getTabStyle("all")}>
            모든 단어({quizData?.count})
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabSelect("correct")}>
          <AppText style={getTabStyle("correct")}>
            정답({data?.correct_count})
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabSelect("incorrect")}>
          <AppText style={getTabStyle("incorrect")}>
            오답({data?.incorrect_count})
          </AppText>
        </TouchableOpacity>
      </View>
      <ScrollView>{renderWords()}</ScrollView>
    </View>
  );
};

export default ResultScreen;
