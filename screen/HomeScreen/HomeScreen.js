// Inside HomeScreen.js

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";
import AppText from "../../components/common/AppText";
import { useAuth } from "../../config/AuthContext";

import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const { logout, token } = useAuth();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="person-circle"
          size={24}
          color="black"
          onPress={() => navigation.navigate("ProfileScreen")}
        />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Button title="Logout" onPress={logout} />
      <AppText>{token}</AppText>
    </View>
  );
};

export default HomeScreen;
