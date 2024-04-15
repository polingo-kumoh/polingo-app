// Inside HomeScreen.js

import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppText from "../../components/common/AppText";
import { styles } from "./ProfileScreenStyle";

import { useUserData } from "../../hooks/useUserData";
import { useUpdateNickname } from "../../hooks/useUpdateNickname";

import { useAuth } from "../../config/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { token, logout } = useAuth();
  const { data: userData, isLoading, error } = useUserData(token);
  const { mutate: updateNicknameMutate } = useUpdateNickname();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");

  const navigation = useNavigation();

  const handleEdit = () => {
    setNickname(userData.nickname);
    setIsEditing(true);
  };
  const handleSubmit = () => {
    updateNicknameMutate(
      { token, newNickname: nickname },
      {
        onSuccess: () => {
          Alert.alert(
            "성공", // 제목
            "닉네임 변경에 성공하였습니다.", // 메시지
            [{ text: "확인" }],
            { cancelable: false } // Android에서 백 버튼을 통한 취소를 막음
          );
        },
        onError: (error) => {
          Alert.alert(
            "실패", // 제목
            `잠시후에 다시 시도해주세요. ${error}`,
            [{ text: "확인" }],
            { cancelable: false } // Android에서 백 버튼을 통한 취소를 막음
          );
        },
      }
    );
    setIsEditing(false);
  };

  if (isLoading) {
    return <AppText>Loading...</AppText>;
  }

  if (error) {
    return <AppText>Error: {error.message}</AppText>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userData}>
        <Ionicons name="person-circle" size={80} color="black" />
        {isEditing ? (
          <TextInput
            style={styles.userNameInput}
            value={nickname}
            onChangeText={setNickname}
            onSubmitEditing={handleSubmit}
            autoFocus
          />
        ) : (
          <>
            <AppText style={styles.userName}>{userData.nickname}</AppText>
            <TouchableOpacity onPress={handleEdit}>
              <MaterialCommunityIcons name="pencil" size={15} color="black" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <TouchableOpacity
        style={styles.userSetting}
        onPress={() =>
          navigation.navigate("ChangeLanguageScreen", {
            language: userData.default_language,
          })
        }
      >
        <AppText style={styles.setting}>기본 언어 설정</AppText>
        <View style={styles.defaultView}>
          <AppText>{userData.default_language}</AppText>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#bbb" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.userSetting} onPress={() => logout()}>
        <AppText style={styles.logout}>로그아웃</AppText>
      </TouchableOpacity>
      <View style={styles.blank_}></View>
    </View>
  );
};

export default ProfileScreen;
