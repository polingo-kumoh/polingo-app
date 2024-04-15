// Inside TranslationScreen.js

import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./TranslationScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "./../../config/AuthContext";
import { useUserData } from "../../hooks/useUserData";
import ConfirmPhotoModal from "../../components/component/ConfirmPhotoModal/ConfirmPhotoModal";
import theme from "../../config/theme";

import * as ImagePicker from "expo-image-picker";

const TranslationScreen = () => {
  const { token } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [transBtn, setTransBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (newStatus !== "granted") {
        alert("카메라 접근 권한이 필요합니다.");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      setModalVisible(true);
    }
  };

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

  const handleImageConfirm = (uri) => {
    console.log("URI:", uri);
  };

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
              <TouchableOpacity style={styles.sideBtn} onPress={pickImage}>
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
      <ConfirmPhotoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedImage={selectedImage}
        onReselect={pickImage}
        onConfirm={handleImageConfirm}
      />
    </View>
  );
};

export default TranslationScreen;
