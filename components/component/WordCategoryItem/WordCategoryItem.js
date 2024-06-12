// Inside WordCategoryItem.js

import React from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./WordCategoryItemStyle";

const WordCategoryItem = ({
  name,
  count,
  isSelected,
  onPress,
  id,
  language,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected ? styles.selected : null]}
      onPress={() => onPress(id)}
    >
      <AppText style={styles.name}>{name}</AppText>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AppText>
          단어 <AppText style={{ color: "blue" }}>{count}</AppText>개
        </AppText>
        <AppText>{language}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default WordCategoryItem;
