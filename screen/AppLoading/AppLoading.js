// Inside HomeScreen.js

import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const AppLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>로딩 중...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
  },
});

export default AppLoading;
