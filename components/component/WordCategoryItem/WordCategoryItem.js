// Inside WordCategoryItem.js

import React from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./WordCategoryItemStyle";

const WordCategoryItem = ({ name, count, isSelected, onPress, id }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected ? styles.selected : null]}
      onPress={() => onPress(id)}
    >
      <AppText style={styles.name}>{name}</AppText>
      <AppText>
        단어 <AppText style={{ color: "blue" }}>{count}</AppText>개
      </AppText>
    </TouchableOpacity>
  );
};

export default WordCategoryItem;
