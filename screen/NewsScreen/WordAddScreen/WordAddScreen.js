// Inside HomeScreen.js

import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./WordAddScreenStyle";
import { useAuth } from "./../../../config/AuthContext";
import { useAddWord } from "../../../hooks/useAddWord";
import { useNoteData } from "../../../hooks/useNoteData";
import WordCategoryItem from "./../../../components/component/WordCategoryItem/WordCategoryItem";

const WordAddScreen = ({ navigation, route }) => {
  const { word, description } = route.params;
  const { token } = useAuth();
  const { data: noteDataApi } = useNoteData(token);
  const addWord = useAddWord();
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectItem = (id) => {
    setSelectedId(selectedId === id ? null : id); // 이미 선택된 아이템을 클릭하면 선택 해제
  };

  const handleComplete = () => {
    if (!selectedId) {
      Alert.alert(
        "선택된 단어장이 없습니다.",
        "단어장을 선택하고 다시 시도해주세요."
      );
      return;
    }
    addWord.mutate(
      {
        token,
        id: selectedId,
        word: word,
        description: description,
      },
      {
        onSuccess: () => {
          Alert.alert("저장 성공", "성공적으로 단어가 저장되었습니다.");
          navigation.goBack();
        },
        onError: (error) => {
          Alert.alert("Error", "Failed to store word category.");
          console.error("Error store word category:", error);
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
  }, [navigation, selectedId]);

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
            language={item.language}
          />
        )}
      />
    </View>
  );
};

export default WordAddScreen;
