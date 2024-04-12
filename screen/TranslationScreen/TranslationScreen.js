// Inside TranslationScreen.js

import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./TranslationScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "./../../config/AuthContext";
import { useUserData } from "../../hooks/useUserData";
import theme from "../../config/theme";

const TranslationScreen = () => {
  const { token } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [transBtn, setTransBtn] = useState(false);
  const { data: userData } = useUserData(token);
  const [inputHeight, setInputHeight] = useState(theme.screenHeight - 300);

  useEffect(() => {
    if (
      userData &&
      userData.defaultLanguage &&
      userData.defaultLanguage.length !== 0
    ) {
      setLoading(false);
    }
  }, [userData]);

  const handleContentSizeChange = (event) => {
    const newHeight = event.nativeEvent.contentSize.height;
    if (newHeight > theme.screenHeight - 300) {
      setInputHeight(newHeight);
    }
  };

  const transText = () => {
    setTransBtn(true);
    Keyboard.dismiss();
  };

  const getInputStyle = () => {
    const baseStyle = {
      ...styles.input,
      height: Math.max(theme.screenHeight - 300, inputHeight),
    };
    if (transBtn) {
      return [baseStyle, { height: theme.screenHeight - 150 }];
    }
    return baseStyle;
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <AppText>Loading user data...</AppText>
      </View>
    );
  }

  const resetTranslation = () => {
    Keyboard.dismiss();
    setTransBtn(false);
    setInputText("");
  };

  const getTransViewStyle = () => ({
    ...styles.transView,
    bottom: inputHeight - 100,
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={getInputStyle()}
          onChangeText={(text) => setInputText(text)}
          value={inputText}
          multiline
          numberOfLines={4}
          onContentSizeChange={handleContentSizeChange}
          placeholder="텍스트 입력"
        />
        {inputText.length > 0 && (
          <TouchableOpacity style={styles.arrowIconView} onPress={transText}>
            <AntDesign
              name="arrowright"
              style={styles.arrowIcon}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
      {transBtn ? (
        <>
          <View style={styles.translatedLanguage}>
            <AppText style={styles.language}>
              {isLoading ? "Loading" : userData.defaultLanguage}
            </AppText>
            <AntDesign name="arrowright" size={24} color="black" />
            <AppText style={styles.language}>한국어</AppText>
          </View>
          <View style={getTransViewStyle()}>
            <AppText>번역본</AppText>
          </View>
          <TouchableOpacity
            style={styles.newTranslationBtn}
            onPress={resetTranslation}
          >
            <AntDesign name="plus" size={16} color="black" />
            <AppText style={styles.newTranslationText}>새 번역</AppText>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.bottom}>
          <View style={styles.translatedLanguage}>
            <AppText style={styles.language}>
              {isLoading ? "Loading" : userData.defaultLanguage}
            </AppText>
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
      )}
    </View>
  );
};

export default TranslationScreen;
