import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppText from "../../components/common/AppText";
import { styles } from "./QuestionScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNoteData } from "../../hooks/useNoteData";
import { useWordData } from "../../hooks/useWordData";
import { useAuth } from "../../config/AuthContext";

const QuestionScreen = ({ navigation }) => {
  const { token } = useAuth();
  const { data: noteDataApi, refetch } = useNoteData(token);
  const [defaultCategoryId, setDefaultCategoryId] = useState(null);
  const [defaultCategoryName, setDefaultCategoryName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // defaultCategoryId를 이용해 단어 데이터를 가져오기
  const { data: wordData, refetch: wordRefetch } = useWordData(
    token,
    defaultCategoryId,
    !!defaultCategoryId
  );

  useEffect(() => {
    const defaultItem = noteDataApi?.find((item) => item.is_default);
    if (defaultItem) {
      setDefaultCategoryId(defaultItem.id);
      setDefaultCategoryName(defaultItem.name);
    }
  }, [noteDataApi]);

  useEffect(() => {
    if (defaultCategoryId) {
      wordRefetch();
    }
  }, [defaultCategoryId, wordRefetch]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

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

  const handlePress = (screenName) => {
    if (wordData?.words?.length === 0) {
      setModalVisible(true);
    } else {
      navigation.navigate(screenName, { defaultCategoryId });
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Ionicons name="sad-outline" size={100} color="grey" />
            <AppText style={styles.modalText}>저장된 단어가 없어요!</AppText>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                closeModal();
                navigation.navigate("TranslationScreen");
              }}
            >
              <AppText style={styles.buttonText}>번역기로 이동</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                closeModal();
                navigation.navigate("NewsScreen");
              }}
            >
              <AppText style={styles.buttonText}>뉴스로 이동</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "red" }}
              onPress={() => closeModal()}
            >
              <AppText style={styles.buttonText}>닫기</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.quizItemView}>
        <TouchableOpacity
          style={styles.quizItem}
          onPress={() => handlePress("FlashCardScreen")}
        >
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
        <TouchableOpacity
          style={styles.quizItem}
          onPress={() => handlePress("McqScreen")}
        >
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
        <TouchableOpacity
          style={styles.quizItem}
          onPress={() => handlePress("DictationScreen")}
        >
          <Feather name="monitor" size={40} color="#00B0F0" />
          <AppText style={styles.quizTitle}>받아쓰기</AppText>
          <AppText style={styles.quizDescription}>
            단어의 철자를 입력하세요
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizItem}
          onPress={() => handlePress("BlinkingScreen")}
        >
          <FontAwesome5 name="angle-double-right" size={40} color="#00B0F0" />
          <AppText style={styles.quizTitle}>깜빡이</AppText>
          <AppText style={styles.quizDescription}>
            보고만 있거나 듣고만 있거나
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionScreen;
