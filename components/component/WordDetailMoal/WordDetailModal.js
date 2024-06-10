// WordDetailModal.js
import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import AppText from "../../../components/common/AppText";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./WordDetailModalStyle";

const WordDetailModal = ({
  visible,
  onClose,
  wordDetailData,
  translation,
  isTranslationLoading,
  navigation,
  setIsTranslationLoading,
}) => {
  useEffect(() => {
    if (wordDetailData) {
      setIsTranslationLoading(false);
    }
  }, [wordDetailData]);
  const renderModalContent = () => {
    if (isTranslationLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    if (wordDetailData) {
      return (
        <>
          <View style={styles.originView}>
            <AppText style={styles.modalOriginal}>
              {wordDetailData.word}
            </AppText>
            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate("WordAddScreen", {
                  word: wordDetailData.word,
                  description: translation,
                });
              }}
            >
              <Ionicons name="bookmark-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <AppText style={styles.modalTrans}>trans. {translation}</AppText>
          <AppText style={styles.modalText}>
            {wordDetailData.description}
          </AppText>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <AppText style={styles.textStyle}>닫기</AppText>
          </Pressable>
        </>
      );
    }
    return null;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{renderModalContent()}</View>
      </View>
    </Modal>
  );
};

export default WordDetailModal;
