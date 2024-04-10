// Inside LoginScreen.js

import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./LoginScreenStyle";

import 카카오_로그인_이미지 from "../../assets/images/카카오_로그인_이미지.png";
import 구글_로그인_심볼 from "../../assets/images/구글_로그인_심볼.png";

import AppText from "../../components/common/AppText";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <AppText style={styles.slogan}>말하다, Learn, れんけつ</AppText>
        <AppText style={styles.slogan}>언어의 모든 것,</AppText>
      </View>
      <View style={styles.loginImageView}>
        <AppText style={styles.loginImageText}>
          번역부터 소통, 학습까지 원스톱으로
        </AppText>
      </View>
      <View style={styles.polingoView}>
        <AppText style={styles.polingo}>Polingo</AppText>
      </View>
      <View style={styles.loginBtn}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("OAuthLoginScreen", { service: "kakao" })
          }
        >
          <Image source={카카오_로그인_이미지} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleLogin}
          onPress={() =>
            navigation.navigate("OAuthLoginScreen", { service: "google" })
          }
        >
          <Image source={구글_로그인_심볼} style={styles.googleSymbol} />
          <Text style={styles.googleText}>Sign up with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
