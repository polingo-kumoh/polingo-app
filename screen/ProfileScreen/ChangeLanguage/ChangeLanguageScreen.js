// Inside ChangeLanguageScreen.js

import React, { useState } from "react";
import { View, Switch } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./ChangeLanguageScreenStyle";

import { useUpdateLanguage } from "../../../hooks/useUpdateLanguage";
import { useAuth } from "../../../config/AuthContext";

const ChangeLanguageScreen = ({ route }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    route.params.language
  );

  const { token } = useAuth();
  const { mutate: updateLanguageMutate } = useUpdateLanguage();

  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
    newLanguage === "ENGLISH"
      ? updateLanguageMutate({ token, language: "en" })
      : updateLanguageMutate({ token, language: "jp" });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.languageView}>
          <AppText style={styles.languageText}>English (영어)</AppText>
          <Switch
            value={selectedLanguage === "ENGLISH"}
            onValueChange={() => handleLanguageChange("ENGLISH")}
          />
        </View>
        <View style={styles.languageView}>
          <AppText style={styles.languageText}>日本語 (일본어)</AppText>
          <Switch
            value={selectedLanguage === "JAPAN"}
            onValueChange={() => handleLanguageChange("JAPAN")}
          />
        </View>
      </View>
    </View>
  );
};

export default ChangeLanguageScreen;
