// Inside TranslationScreen.js

import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./TranslationScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const TranslationScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="텍스트 입력" />
      <View style={styles.bottom}>
        <View style={styles.translatedLanguage}>
          <AppText style={styles.language}>영어</AppText>
          <AntDesign name="arrowright" size={24} color="black" />
          <AppText style={styles.language}>한국어</AppText>
        </View>
        <View style={styles.transBtn}>
          <View style={styles.side}>
            <TouchableOpacity style={styles.sideBtn}>
              <FontAwesome name="photo" size={24} color="black" />
            </TouchableOpacity>
            <AppText style={styles.sideText}>사진 불러오기</AppText>
          </View>

          <TouchableOpacity style={styles.centerBtn}>
            <FontAwesome name="microphone" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.side}>
            <TouchableOpacity style={styles.sideBtn}>
              <AntDesign name="camera" size={24} color="black" />
            </TouchableOpacity>
            <AppText style={styles.sideText}>사진 찍기</AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TranslationScreen;
