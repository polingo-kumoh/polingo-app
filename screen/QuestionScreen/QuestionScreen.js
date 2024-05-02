// Inside QuestionScreen.js

import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./QuestionScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
          onPress={() => navigation.navigate("QuestionCategorySelection")}
        >
          <AppText style={styles.default}>{defaultCategoryName}</AppText>
          <AntDesign name="menuunfold" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, defaultCategoryName]);

  return (
    <View style={styles.container}>
      <AppText>
        <MaterialCommunityIcons
          name="numeric-4-box-multiple-outline"
          size={24}
          color="black"
        />
      </AppText>
    </View>
  );
};

export default QuestionScreen;
