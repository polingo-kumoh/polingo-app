// Inside QuestionScreen.js

import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./QuestionScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const QuestionScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => console.log("카테고리 변경")}>
          <AntDesign name="menuunfold" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
