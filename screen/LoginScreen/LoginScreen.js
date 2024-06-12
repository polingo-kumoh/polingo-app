import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./LoginScreenStyle";
import * as Google from "expo-auth-session/providers/google";

import 카카오_로그인_이미지 from "../../assets/images/카카오_로그인_이미지.png";
import 구글_로그인_심볼 from "../../assets/images/구글_로그인_심볼.png";

import AppText from "../../components/common/AppText";

const LoginScreen = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "731523653517-3fra7e5e5mv4jlrele1ud3pjj93qvsp6.apps.googleusercontent.com",
    iosClientId:
      "731523653517-3fra7e5e5mv4jlrele1ud3pjj93qvsp6.apps.googleusercontent.com",
    expoClientId:
      "731523653517-3fra7e5e5mv4jlrele1ud3pjj93qvsp6.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // 사용자가 로그인에 성공한 후 처리 로직을 추가합니다.
      console.log(authentication);
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
