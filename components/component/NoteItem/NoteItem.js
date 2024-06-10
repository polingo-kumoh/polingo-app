import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./NoteItemStyle";
import Checkbox from "expo-checkbox";

const NoteItem = ({
  id,
  origin,
  translation,
  category,
  edit,
  selected,
  onSelect,
  selectAll,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      {edit && (
        <Checkbox
          value={selectAll ? selectAll : selected}
          style={styles.check}
          onValueChange={() => onSelect(id)}
        />
      )}
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setOpen(!open)}
      >
        <AppText style={styles.itemTitle}>{origin}</AppText>
        {open && <AppText style={styles.itemTrans}>{translation}</AppText>}
        <View style={styles.under}>
          <AppText>{category}</AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NoteItem;
