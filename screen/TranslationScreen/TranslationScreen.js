// Inside TranslationScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  Linking,
} from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./TranslationScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "./../../config/AuthContext";
import { useUserData } from "../../hooks/useUserData";
import ConfirmPhotoModal from "../../components/component/ConfirmPhotoModal/ConfirmPhotoModal";
import theme from "../../config/theme";
import usePermissions from "../../hooks/usePermissions";
import useAudioRecorder from "../../hooks/useAudioRecorder";

import * as ImagePicker from "expo-image-picker";

const TranslationScreen = () => {
  const { token } = useAuth();
  const permissions = usePermissions();
  const { startRecording, stopRecording, recordUri, isRecording } =
    useAudioRecorder();
  const [isLoading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [transBtn, setTransBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    uri: null,
    base64: null,
  });

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

  useEffect(() => {
    //console.log(recordUri);
  }, [recordUri]);

  useEffect(() => {
    if (permissions.status === "denied") {
      Alert.alert(
        "허가 거부",
        "카메라와 앨범에 접근하기 위한 권한이 없습니다.",
        [
          {
            text: "취소",
            onPress: () => console.log("Permission denied response"),
          },
          { text: "설정", onPress: () => Linking.openSettings() },
        ],
        { cancelable: false }
      );
    }
  }, [permissions.status]);

  const handleImageAction = async (action) => {
    try {
      let result = await action({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setSelectedImage({
          uri: result.assets[0].uri,
          base64: result.assets[0].base64,
        });
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert("Error", "이미지 업로드 실패");
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

  if (!permissions.camera || !permissions.mediaLibrary) {
    return (
      <View style={styles.container}>
        <AppText>Permissions required!</AppText>
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
    //console.log("URI:", uri);
  };

  const pickImage = () =>
    handleImageAction(ImagePicker.launchImageLibraryAsync);
  const takePhoto = () => handleImageAction(ImagePicker.launchCameraAsync);

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

            {isRecording ? (
              <TouchableOpacity
                style={styles.centerBtn}
                onPress={stopRecording}
              >
                <FontAwesome name="stop-circle" size={24} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.centerBtn}
                onPress={startRecording}
              >
                <FontAwesome name="microphone" size={24} color="white" />
              </TouchableOpacity>
            )}
            <View style={styles.side}>
              <TouchableOpacity style={styles.sideBtn} onPress={takePhoto}>
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
