// Inside ResultWord.js

import React from "react";
import { View } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./ResultWordStyle";

const ResultWord = ({ word, trans }) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.word}>{word}</AppText>
      <AppText style={styles.trans}>{trans}</AppText>
    </View>
  );
};

export default ResultWord;
