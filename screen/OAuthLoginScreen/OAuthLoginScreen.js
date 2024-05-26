/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import { useAuth } from "../../config/AuthContext";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function OAuthLoginScreen({ route, navigation }) {
  const { service } = route.params; // 'kakao' 또는 'google'
  const { login } = useAuth();

  const OAuthLoginWebView = async (data) => {
    try {
      const exp = "token=";
      let condition = data.indexOf(exp);
      if (condition != -1) {
        const access_token = data.substring(condition + exp.length);
        login(access_token); // 서버로부터 받은 사용자 이름으로 변경
      } else {
        // 토큰을 찾을 수 없는 경우의 처리
        throw new Error("Token not found in the response");
      }
    } catch (error) {
      console.error("Login Error:", error);
      //navigation.navigate("LoginScreen");
    }
  };
  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1, marginTop: 40 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_URL}/api/login/${service}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onNavigationStateChange={(navState) => {
          // URL에서 토큰 값 추출 로직
          const { url } = navState;
          if (url.includes("?token=")) {
            OAuthLoginWebView(url);
          }
        }}
        onMessage={(event) => {
          // OAuthLoginWebView(event.nativeEvent.data); 일단 에러가 나서 비활성화. 추후 풀수도?
        }}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
