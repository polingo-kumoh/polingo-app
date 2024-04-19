// Inside NewsDetailScreen.js
import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./NewsDetailScreenStyle";
import AppText from "../../../components/common/AppText";

const NewsDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { idx, title } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [title, navigation]);

  return (
    <View style={styles.container}>
      <AppText>ㅎㅇ</AppText>
    </View>
  );
};

export default NewsDetailScreen;
