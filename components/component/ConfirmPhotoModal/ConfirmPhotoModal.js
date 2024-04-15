import React from "react";
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { styles } from "./ConfirmPhotoModalStyle";

const ConfirmPhotoModal = ({
  modalVisible,
  setModalVisible,
  selectedImage,
  onReselect,
  onConfirm,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            source={{ uri: selectedImage }}
            style={styles.modalImage}
            resizeMode="contain"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
                onReselect && onReselect();
              }}
            >
              <Text style={styles.textStyle}>재선택</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
                onConfirm && onConfirm(selectedImage);
              }}
            >
              <Text style={styles.textStyle}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmPhotoModal;
