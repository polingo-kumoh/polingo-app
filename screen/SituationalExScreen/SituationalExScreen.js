// Inside SituationalExScreen.js

import React from "react";
import { View } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./SituationalExScreenStyle";

const SituationalExScreen = () => {
  return (
    <View style={styles.container}>
      <AppText>SituationalExScreen</AppText>
    </View>
  );
};

export default SituationalExScreen;
