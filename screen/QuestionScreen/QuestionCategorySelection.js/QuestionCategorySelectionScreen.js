// Inside QuestionCategorySelectionScreen.js

import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./QuestionCategorySelectionScreenStyle";
import { useAuth } from "../../../config/AuthContext";
import { useNoteData } from "../../../hooks/useNoteData";
import WordCategoryItem from "./../../../components/component/WordCategoryItem/WordCategoryItem";
import { useSelectNote } from "./../../../hooks/useSelectNote";

const QuestionCategorySelectionScreen = ({ navigation }) => {
  const { token } = useAuth();
  const { data: noteDataApi } = useNoteData(token);
  const [selectedId, setSelectedId] = useState(null);
  const { mutate: selectNote } = useSelectNote();
  const handleSelectItem = (id) => {
    setSelectedId(selectedId === id ? null : id); // 이미 선택된 아이템을 클릭하면 선택 해제
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        selectedId ? (
          <TouchableOpacity onPress={handleSetDefaultCategory}>
            <AppText style={styles.complete}>완료</AppText>
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, selectedId]);

  const handleSetDefaultCategory = (id) => {
    Alert.alert(
      "기본 단어장 설정",
      "이 단어장을 기본으로 설정하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "확인",
          onPress: () =>
            selectNote(
              { token, id: selectedId },
              {
                onSuccess: () => {
                  console.log("Default category set successfully");
                  navigation.goBack();
                },
                onError: (error) =>
                  console.error("Failed to set default category:", error),
              }
            ),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={noteDataApi}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WordCategoryItem
            id={item.id}
            name={item.name}
            count={item.count}
            isSelected={selectedId === item.id}
            onPress={handleSelectItem}
          />
        )}
      />
    </View>
  );
};

export default QuestionCategorySelectionScreen;
