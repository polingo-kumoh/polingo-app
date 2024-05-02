import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./CategoryItemStyle";
import { FontAwesome, Foundation, AntDesign } from "@expo/vector-icons";

const CategoryItem = ({ name, onEdit, onDelete, onSetDefault }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleEditToggle = () => {
    if (isEditing) {
      onEdit(editedName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onSetDefault}>
      {isEditing ? (
        <TextInput
          style={styles.categoryText}
          value={editedName}
          onChangeText={setEditedName}
          autoFocus={true}
          onSubmitEditing={handleEditToggle}
        />
      ) : (
        <AppText style={styles.categoryText}>{name}</AppText>
      )}
      <View style={styles.iconView}>
        {isEditing ? (
          <TouchableOpacity onPress={handleEditToggle}>
            <AntDesign name="check" size={30} color="green" />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Foundation name="pencil" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <FontAwesome name="trash" size={30} color="black" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;
