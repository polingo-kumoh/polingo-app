// Inside QuestionScreen.js

import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./QuestionScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNoteData } from "../../hooks/useNoteData";
import { useAuth } from "../../config/AuthContext";

const QuestionScreen = ({ navigation }) => {
  const { token } = useAuth();
  const { data: noteDataApi, refetch } = useNoteData(token);
  const [defaultCategoryId, setDefaultCategoryId] = useState(null);
  const [defaultCategoryName, setDefaultCategoryName] = useState(null);

  useEffect(() => {
    const defaultItem = noteDataApi?.find((item) => item.is_default);
    if (defaultItem) {
      setDefaultCategoryId(defaultItem.id);
      setDefaultCategoryName(defaultItem.name);
    }
  }, [noteDataApi]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.navigate("QuestionCategorySelectionScreen")}
        >
          <AppText style={styles.default}>{defaultCategoryName}</AppText>
          <AntDesign name="menuunfold" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, defaultCategoryName]);

  return (
    <View style={styles.container}>
      <View style={styles.quizItemView}>
        <TouchableOpacity style={styles.quizItem}>
          <MaterialCommunityIcons
            name="cards-outline"
            size={40}
            color="#00B0F0"
          />
          <AppText style={styles.quizTitle}>플래시카드</AppText>
          <AppText style={styles.quizDescription}>
            단어 카드를 좌우로 스와이프 하세요
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quizItem}>
          <MaterialCommunityIcons
            name="numeric-4-box-multiple-outline"
            size={40}
            color="#00B0F0"
          />
          <AppText style={styles.quizTitle}>사지선다</AppText>
          <AppText style={styles.quizDescription}>
            문제를 읽고 정답을 선택하세요{" "}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quizItem}>
          <Feather name="monitor" size={40} color="#00B0F0" />
          <AppText style={styles.quizTitle}>받아쓰기</AppText>
          <AppText style={styles.quizDescription}>
            단어의 철자를 입력하세요
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quizItem}>
          <FontAwesome5 name="angle-double-right" size={40} color="#00B0F0" />
          <AppText style={styles.quizTitle}>깜빡이</AppText>
          <AppText style={styles.quizDescription}>
            보고만 있거나 듣고만 있거나
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.quizOptions}>
        <TouchableOpacity
          style={styles.quizOption}
          onPress={() => navigation.navigate("QuestionLogScreen")}
        >
          <AppText style={styles.quizOptionTitle}>나의 학습 기록</AppText>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionScreen;
