// Inside CategoryAddScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./CategoryAddScreenStyle";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../../../config/AuthContext";
import { useAddNote } from "./../../../hooks/useAddNote";

const CategoryAddScreen = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState("");
  const [language, setLanguage] = useState("English");
  const { token } = useAuth();
  const { mutate: addNote, isLoading, isError, error } = useAddNote();

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      Alert.alert("Error", "카테고리 이름을 입력해주세요.");
      return;
    }
    addNote(
      { token, name: categoryName, language },
      {
        onSuccess: () => {
          Alert.alert("Success", "카테고리가 성공적으로 추가되었습니다.");
          navigation.goBack();
        },
        onError: (error) => {
          Alert.alert("Error", `카테고리 추가 실패: ${error.message}`);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={language}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Janpanese" value="ja" />
      </Picker>

      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          onChangeText={setCategoryName}
          value={categoryName}
          placeholder="카테고리 이름"
        />

        <Button
          title="생성"
          style={styles.button}
          onPress={() => {
            handleAddCategory();
          }}
        />
      </View>
    </View>
  );
};

export default CategoryAddScreen;
