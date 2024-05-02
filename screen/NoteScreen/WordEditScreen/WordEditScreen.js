// Inside WordEditScreen.js

import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, FlatList, Alert } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./WordEditScreenStyle";
import WordCategoryItem from "../../../components/component/WordCategoryItem/WordCategoryItem";
import { useAuth } from "../../../config/AuthContext";
import { useNoteData } from "../../../hooks/useNoteData";
import { useChangeWordCategory } from "../../../hooks/useChangeWordCategory";

const WordEditScreen = ({ navigation, route }) => {
  const { selectedItems, defaultCategoryId } = route.params;
  const { token } = useAuth();
  const { data: noteDataApi } = useNoteData(token);
  const [selectedId, setSelectedId] = useState(null);
  const changeWordCategory = useChangeWordCategory();
  const handleSelectItem = (id) => {
    setSelectedId(selectedId === id ? null : id); // 이미 선택된 아이템을 클릭하면 선택 해제
  };
  const handleComplete = () => {
    if (!selectedId) {
      Alert.alert("No category selected", "Please select a category first.");
      return;
    }
    changeWordCategory.mutate(
      {
        token,
        originNotdeId: defaultCategoryId,
        wordId: selectedItems,
        targetNoteId: selectedId,
      },
      {
        onSuccess: () => {
          Alert.alert("변경 성공", "성공적으로 단어가 변경되었습니다.");
          navigation.goBack();
        },
        onError: (error) => {
          Alert.alert("Error", "Failed to change word category.");
          console.error("Error changing word category:", error);
        },
      }
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        selectedId ? (
          <TouchableOpacity onPress={handleComplete}>
            <AppText style={styles.complete}>완료</AppText>
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, selectedId]); // selectedId가 변경될 때마다 옵션 업데이트

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

export default WordEditScreen;
