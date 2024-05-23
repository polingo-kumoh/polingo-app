import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppText from "../../components/common/AppText";
import { styles } from "./NoteScreenStyle";
import { MaterialIcons } from "@expo/vector-icons";
import NoteItem from "./../../components/component/NoteItem/NoteItem";
import { Feather } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useWordData } from "../../hooks/useWordData";
import { useAuth } from "./../../config/AuthContext";
import { useNoteData } from "../../hooks/useNoteData";
import { useDeleteWord } from "../../hooks/useDeleteWord";

const NoteScreen = ({ navigation }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [defaultCategoryId, setDefaultCategoryId] = useState(null);
  const { token } = useAuth();
  const { data: noteDataApi, refetch } = useNoteData(token);
  const {
    data: wordData,
    isLoading,
    isError,
    error,
    refetch: wordRefetch,
  } = useWordData(token, defaultCategoryId, !!defaultCategoryId);
  const { mutate: deleteWord, isLoading: isDeleting } = useDeleteWord();
  const [defaultCategoryName, setDefaultCategoryName] = useState("");

  useEffect(() => {
    const defaultItem = noteDataApi?.find((item) => item.is_default);
    if (defaultItem) {
      setDefaultCategoryId(defaultItem.id);
      setDefaultCategoryName(defaultItem.name);
    }
  }, [noteDataApi]);

  useFocusEffect(
    useCallback(() => {
      refetch();
      wordRefetch();
    }, [])
  );

  useEffect(() => {
    if (defaultCategoryId) {
      wordRefetch();
    }
  }, [defaultCategoryId, wordRefetch]);

  if (isError) {
    console.error("Error fetching word data:", error.message);
  }

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (editMode) {
      setSelectedItems([]); // 편집 모드를 끄면 선택된 항목을 초기화
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wordRefetch().finally(() => setRefreshing(false));
  }, [wordRefetch]);

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleNavigateToWordEditScreen = () => {
    if (selectedItems.length === 0) {
      Alert.alert(
        "알림",
        "선택된 단어가 없습니다. 단어를 선택하고 다시 시도해주세요."
      );
      return;
    } else {
      navigation.navigate("WordEditScreen", {
        selectedItems: selectedItems,
        defaultCategoryId,
      });
    }
  }; //이거 적용해야함

  const handleDeleteWords = () => {
    if (selectedItems.length > 0) {
      Alert.alert("삭제 확인", "선택한 단어를 삭제하시겠습니까?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteWord(
              { token, noteId: defaultCategoryId, wordId: selectedItems }, // Send all IDs in a single request if supported
              {
                onSuccess: () => {
                  wordRefetch();
                  setEditMode(false);
                  setSelectedItems([]);
                },
                onError: (error) => {
                  Alert.alert("Error", "Failed to delete the words.");
                  console.error("Failed to delete words:", error);
                },
              }
            );
          },
        },
      ]);
    } else {
      Alert.alert(
        "선택된 단어가 없습니다.",
        "단어를 선택하고 다시 시도해주세요."
      );
    }
  };

  if (isLoading || !wordData || isDeleting) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    console.error("Error fetching word data:", error.message);
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading data. Please try again later.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={closeMenu}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={closeMenu}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                handleDeleteWords();
                closeMenu();
              }}
            >
              <AppText style={styles.menuText}>삭제</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                // 그룹 변경 로직을 수행하고 메뉴를 닫습니다.
                closeMenu();
                handleEditToggle();
                handleNavigateToWordEditScreen();
              }}
            >
              <AppText style={styles.menuText}>그룹 변경</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu();

                setEditMode(false);
              }}
            >
              <AppText style={styles.menuText}>편집 취소</AppText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.subContainer}>
              <TouchableOpacity
                style={styles.category}
                onPress={() => navigation.navigate("CategoryEditScreen")}
              >
                <AppText style={styles.subTitle}>단어장 변경/편집하기</AppText>
              </TouchableOpacity>

              <AppText style={styles.selectedCategory}>
                현재 단어장 : {defaultCategoryName}
              </AppText>
            </View>
            {editMode && (
              <View style={styles.checkboxContainer}>
                <Checkbox
                  value={selectAll}
                  onValueChange={(newValue) => {
                    setSelectAll(newValue);
                    if (newValue) {
                      // 모든 단어의 ID를 selectedItems에 추가
                      setSelectedItems(wordData?.words?.map((item) => item.id));
                    } else {
                      // selectedItems를 비움
                      setSelectedItems([]);
                    }
                  }}
                  style={styles.checkbox}
                />
                <AppText style={styles.allCheckText}>전체 선택</AppText>
              </View>
            )}
          </>
        }
        data={wordData?.words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem
            id={item.id}
            origin={item.word}
            translation={item.description}
            category={wordData.name}
            edit={editMode}
            selected={selectedItems?.includes(item.id)}
            onSelect={handleSelectItem}
            onDelete={() => handleDeleteWord(defaultCategoryId, item.id)}
            selectAll={selectAll}
          />
        )}
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0000ff"]} // Android only: background color when refreshing
            tintColor="#0000ff" // iOS only: color of the refresh indicator
          />
        }
      />
      {editMode ? (
        <TouchableOpacity
          style={styles.pencilIcon}
          onPress={() => {
            handleMenu();
          }}
        >
          <Foundation name="pencil" size={30} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.pencilIcon}
          onPress={() => {
            handleEditToggle();
          }}
        >
          <Feather name="edit" size={24} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default NoteScreen;
