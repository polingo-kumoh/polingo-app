import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  ActivityIndicator,
  Text,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
import { useTextTranslate } from "./../../hooks/useTextTranslate";
import { useImageUpload } from "./../../hooks/useImageUpload";
import { useAudioUpload } from "./../../hooks/useAudioUpload";
import { useWordDetailData } from "../../hooks/useWordDetailData";
import WordDetailModal from "./../../components/component/WordDetailMoal/WordDetailModal";

const TranslationScreen = ({ navigation }) => {
  const { token } = useAuth();
  const permissions = usePermissions();
  const { startRecording, stopRecording, recordUri, isRecording } =
    useAudioRecorder();
  const { mutate: translateText } = useTextTranslate();
  const imageUpload = useImageUpload();
  const audioUpload = useAudioUpload();
  const [isLoading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [transBtn, setTransBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [translationResult, setTranslationResult] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [selectedImage, setSelectedImage] = useState({
    uri: null,
    base64: null,
  });
  const [wordToFetch, setWordToFetch] = useState(null);
  const [activeWord, setActiveWord] = useState("");
  const [longPressWordTran, setLongPressWordTran] = useState("");
  const [isTranslationLoading, setIsTranslationLoading] = useState(false);
  const [isWordModalVisible, setIsWordModalVisible] = useState(false);
  const { data: userData } = useUserData(token);
  const [inputHeight, setInputHeight] = useState(0);

  const { data: wordDetailData, refetch: refetchWordDetailData } =
    useWordDetailData(token, userData?.default_language, wordToFetch);

  useEffect(() => {
    if (
      userData &&
      userData.default_language &&
      userData.default_language.length !== 0
    ) {
      setLoading(false);
    }
  }, [userData]);

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

  useEffect(() => {
    if (recordUri) {
      handleAudioUpload(recordUri);
    }
  }, [recordUri]);

  useEffect(() => {
    if (wordToFetch) {
      refetchWordDetailData();
    }
  }, [wordToFetch]);

  const handleAudioUpload = (uri) => {
    setLoading(true);
    audioUpload.mutate(
      {
        token: token,
        uri: uri,
        default_language: userData.default_language,
        type: "audio/mpeg",
      },
      {
        onSuccess: (data) => {
          setOriginalText(data.original_text);
          setTranslationResult(data.translated_text);
          setTransBtn(true);
          setLoading(false);
        },
        onError: (error) => {
          Alert.alert(
            "Upload Error",
            error.message || "Failed to upload audio."
          );
          console.error("Upload error:", error);
          setLoading(false);
        },
      }
    );
  };

  const handleImageAction = async (action) => {
    try {
      let result = await action({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setSelectedImage({ uri: result.assets[0].uri });
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert("Error", "이미지 업로드 실패");
    }
  };

  const transText = () => {
    const shouldTranslate = inputText.trim().length > 0;
    if (shouldTranslate) {
      setTransBtn(true);
      setLoading(true);
      translateText(
        {
          token,
          text: inputText,
          default_language: userData.default_language,
        },
        {
          onSuccess: (data) => {
            setTranslationResult(data.translated_text);
            setLoading(false);
          },
          onError: (error) => {
            console.error("Translation error:", error);
            Alert.alert(
              "Translation Error",
              error.message || "Failed to translate. Please try again later."
            );
            setLoading(false);
          },
        }
      );
      Keyboard.dismiss();
    } else {
      setTransBtn(false);
    }
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
    setOriginalText("");
    setTranslationResult("");
  };
  const handleImageConfirm = (image) => {
    setLoading(true);
    imageUpload.mutate(
      {
        token: token,
        uri: image.uri,
        type: "image/jpeg",
        default_language: userData.default_language,
      },
      {
        onSuccess: (data) => {
          setTranslationResult(data.translated_text);
          setOriginalText(data.original_text);
          setTransBtn(true);
          setLoading(false);
        },
        onError: (error) => {
          if (error.response && error.response.status === 413) {
            Alert.alert(
              "이미지 업로드 에러",
              "이미지 용량이 너무 큽니다. 다른 이미지를 선택해주세요."
            );
          } else {
            Alert.alert(
              "이미지 업로드 에러",
              error.message || "Failed to upload image."
            );
          }
          setLoading(false);
        },
      }
    );
  };

  const getInputStyle = () => {
    const baseHeight = theme.screenHeight - 300;
    const dynamicHeight =
      transBtn && baseHeight <= inputHeight + 30
        ? inputHeight + 30
        : baseHeight;
    const baseStyle = {
      ...styles.input,
      height: dynamicHeight,
    };
    if (transBtn) {
      baseStyle.borderBottomLeftRadius = 0;
      baseStyle.borderBottomRightRadius = 0;
      baseStyle.shadowOffset = { width: 0, height: 0 };
      baseStyle.elevation = 0;
      baseStyle.height = inputHeight + 30;
    }
    return baseStyle;
  };

  const getTransViewStyle = () => {
    const baseHeight = theme.screenHeight - 220;

    const bottom = transBtn && baseHeight <= inputHeight + 30 ? inputHeight : 0;
    const height =
      transBtn && baseHeight <= inputHeight + 30
        ? inputHeight + 30
        : baseHeight;
    return {
      ...styles.transView,
      bottom: bottom,
      height: height,
    };
  };

  const getArrowStyle = () => {
    if (transBtn) {
      return {
        ...styles.arrowIconView,
        marginLeft: 10,
        position: undefined,
        right: undefined,
        top: undefined,
      };
    }
  };

  const pickImage = () =>
    handleImageAction(ImagePicker.launchImageLibraryAsync);
  const takePhoto = () => handleImageAction(ImagePicker.launchCameraAsync);
  const stopAndUploadAudio = async () => {
    await stopRecording();
  };

  const handleWordLongPress = (word) => {
    setActiveWord(word);
    setIsTranslationLoading(true);
    setIsWordModalVisible(true); // 여기서 모달을 바로 보여줌
    translateText(
      {
        token,
        text: word,
        default_language: userData.default_language,
      },
      {
        onSuccess: (data) => {
          setWordToFetch(data.original_text);
          setLongPressWordTran(data.translated_text);
          setIsTranslationLoading(false);
        },
        onError: (error) => {
          Alert.alert("Translation Error", error.message);
          setIsTranslationLoading(false);
        },
      }
    );
  };

  const renderWords = (text) => {
    return text.split(" ").map((word, index) => (
      <TouchableOpacity
        key={index}
        onLongPress={() => handleWordLongPress(word)}
      >
        <Text style={styles.word}>{word} </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      )}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        indicatorStyle="black"
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={getInputStyle()}
            onChangeText={(text) => {
              setInputText(text);
              setOriginalText(text);
            }}
            value={originalText}
            multiline={true}
            placeholder="텍스트 입력"
            placeholderTextColor="#ccc"
            onContentSizeChange={(event) =>
              setInputHeight(event.nativeEvent.contentSize.height)
            }
          />
          {inputText.length > 0 && !transBtn && (
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

        {transBtn && (
          <>
            <View style={getTransViewStyle()}>
              <View style={styles.transViewHeader}>
                <View style={styles.transViewBorder} />
                <TouchableOpacity style={getArrowStyle()} onPress={transText}>
                  <AntDesign
                    name="arrowright"
                    style={styles.arrowIcon}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>

              <AppText style={styles.translationText}>
                {translationResult}
              </AppText>
            </View>

            <View style={styles.translatedLanguage}>
              <AppText style={styles.language}>
                {isLoading ? "Loading" : userData.default_language}
              </AppText>
              <AntDesign name="arrowright" size={24} color="black" />
              <AppText style={styles.language}>한국어</AppText>
            </View>

            <View style={styles.translationActions}>
              <TouchableOpacity
                style={styles.saveWordBtn}
                onPress={() => setSaveModalVisible(true)}
              >
                <FontAwesome name="save" size={16} color="black" />
                <AppText style={styles.saveWordText}>단어 저장</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.newTranslationBtn}
                onPress={resetTranslation}
              >
                <AntDesign name="plus" size={16} color="black" />
                <AppText style={styles.newTranslationText}>새 번역</AppText>
              </TouchableOpacity>
            </View>
          </>
        )}

        {!transBtn && (
          <View style={styles.bottom}>
            <View style={styles.translatedLanguage}>
              <AppText style={styles.language}>
                {isLoading ? "Loading" : userData.default_language}
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
                  onPress={stopAndUploadAudio}
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
      </ScrollView>
      <ConfirmPhotoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedImage={selectedImage}
        onReselect={pickImage}
        onConfirm={handleImageConfirm}
      />
      <Modal
        visible={saveModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSaveModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AppText style={styles.modalTitle}>
              단어를 저장하려면 길게 누르세요
            </AppText>
            <View style={styles.wordsContainer}>
              {renderWords(originalText)}
            </View>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setSaveModalVisible(false)}
            >
              <AppText style={styles.modalCloseButtonText}>닫기</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <WordDetailModal
        visible={isWordModalVisible}
        onClose={() => setIsWordModalVisible(false)}
        wordDetailData={wordDetailData}
        translation={longPressWordTran}
        isTranslationLoading={isTranslationLoading}
        navigation={navigation}
        setIsTranslationLoading={setIsTranslationLoading}
      />
    </KeyboardAvoidingView>
  );
};

export default TranslationScreen;
