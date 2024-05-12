// Inside LoginScreen.js

import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./LoginScreenStyle";
import * as AuthSession from "expo-auth-session";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

import 카카오_로그인_이미지 from "../../assets/images/카카오_로그인_이미지.png";
import 구글_로그인_심볼 from "../../assets/images/구글_로그인_심볼.png";

import AppText from "../../components/common/AppText";
import { useAuth } from "./../../config/AuthContext";
import { Alert } from "react-native";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const redirectUri = makeRedirectUri({ useProxy: true });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId:
        "731523653517-3fra7e5e5mv4jlrele1ud3pjj93qvsp6.apps.googleusercontent.com",
      redirectUri,
      scopes: ["email"],
      responseType: AuthSession.ResponseType.Code,
      extraParams: {
        access_type: "offline", // Important for refresh token
        prompt: "consent",
      },
    },
    {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    }
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      login(access_token);
      console.log(response);
    } else if (response?.type === "error") {
      Alert.alert(
        "Authentication error",
        response.error?.message || "Unknown error"
      );
    }
  }, [response]);

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
          onPress={() => promptAsync()}
        >
          <Image source={구글_로그인_심볼} style={styles.googleSymbol} />
          <Text style={styles.googleText}>Sign up with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
