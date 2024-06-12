// Inside CategoryEditScreen.js

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./CategoryEditScreenStyle";
import CategoryItem from "../../../components/component/CategoryItem/CategoryItem";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../../config/AuthContext";
import { useNoteData } from "../../../hooks/useNoteData";
import { useEditNote } from "../../../hooks/useEditNote";
import { useDeleteNote } from "../../../hooks/useDeleteNote";
import { useSelectNote } from "../../../hooks/useSelectNote";

const CategoryEditScreen = ({ navigation }) => {
  const { token } = useAuth();
  const { data: noteDataApi, isLoading, refetch } = useNoteData(token);
  const { mutate: deleteNote, isDeleteLoading } = useDeleteNote();
  const [noteData, setNoteData] = useState([]);
  const { mutate: editCategory, isEditLoading } = useEditNote();
  const { mutate: selectNote } = useSelectNote();
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  useEffect(() => {
    if (noteDataApi) {
      setNoteData(noteDataApi);
    }
  }, [noteDataApi]);

  if (isLoading || isDeleteLoading || isEditLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleEditCategory = (id, newName) => {
    editCategory(
      { token, id, newName },
      {
        onSuccess: () => {
          const updatedCategories = noteData.map((category) =>
            category.id === id ? { ...category, name: newName } : category
          );
          setNoteData(updatedCategories);
        },
        onError: (error) => console.error("Failed to edit category:", error),
      }
    );
  };

  const handleDeleteCategory = (id) => {
    Alert.alert(
      "삭제 확인",
      "정말로 이 카테고리를 삭제하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("삭제 취소됨"),
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            deleteNote(
              { token, id },
              {
                onSuccess: () => {
                  console.log("Category deleted successfully");
                  setNoteData((prevCategories) =>
                    prevCategories.filter((category) => category.id !== id)
                  );
                },
                onError: (error) => {
                  console.error("Failed to delete category:", error);
                },
              }
            );
          },
        },
      ],
      { cancelable: false } // 밖을 눌러도 닫히지 않도록 설정
    );
  };
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
              { token, id },
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
        data={noteData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            name={item.name}
            onEdit={(newName) => handleEditCategory(item.id, newName)}
            onDelete={() => handleDeleteCategory(item.id)}
            onSetDefault={() => handleSetDefaultCategory(item.id)}
          />
        )}
      />
      <TouchableOpacity
        style={styles.plusIcon}
        onPress={() => {
          navigation.navigate("CategoryAddScreen");
        }}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryEditScreen;
