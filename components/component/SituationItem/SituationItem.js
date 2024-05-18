// SituationItem.js

import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./SituationItemStyle";

const SituationItem = ({ navigation, imageSource, label }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("SituationalExDetailScreen", { label })
      }
    >
      <Image
        source={imageSource}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <AppText style={styles.itemLabel}>{label}</AppText>
    </TouchableOpacity>
  );
};

export default SituationItem;
