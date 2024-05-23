// Inside SituationalExDetailScreen.js

import React, { useEffect, useState } from "react";
import { ScrollView, View, FlatList, TouchableOpacity } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./SituationalExDetailScreenStyle";
import SituationDetailItem from "../../../components/component/SituationDetailItem/SituationDetailItem";
import { useAuth } from "../../../config/AuthContext";
import { useUserData } from "../../../hooks/useUserData";
import { usePlaceEx } from "../../../hooks/usePlaceEx";

const SituationalExDetailScreen = ({ navigation, route }) => {
  const { label } = route.params;
  const { token } = useAuth();
  const { data: userData } = useUserData(token);
  const {
    data: placeData,
    isError,
    error,
  } = usePlaceEx(token, userData?.default_language);

  const [selectedLabel, setSelectedLabel] = useState(null);

  useEffect(() => {
    if (placeData) {
      const defaultLabel = placeData.find((item) => item.name === label)
        ?.detail_situations[0]?.name;
      setSelectedLabel(defaultLabel || "");
    }
  }, [placeData]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          <AppText style={styles.title}>{label}</AppText>
        </View>
      ),
    });
  }, [label]);

  const handleLabelPress = (label) => {
    setSelectedLabel(label);
  };

  if (isError) {
    return (
      <View style={styles.container}>
        <AppText style={styles.errorText}>Error: {error.message}</AppText>
      </View>
    );
  }

  if (!placeData) {
    return (
      <View style={styles.container}>
        <AppText style={styles.loadingText}>Loading...</AppText>
      </View>
    );
  }

  const currentPlace = placeData.find((item) => item.name === label);
  const labels = currentPlace
    ? currentPlace.detail_situations.map((situation) => situation.name)
    : [];

  return (
    <View style={styles.container}>
      <FlatList
        data={labels}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.labelItem}
            onPress={() => handleLabelPress(item)}
          >
            <View style={styles.labelContainer}>
              <AppText
                style={[
                  styles.labelText,
                  item === selectedLabel && styles.selectedLabelText,
                ]}
              >
                {item}
              </AppText>
              {item === selectedLabel && <View style={styles.underline} />}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.labelList}
      />

      <ScrollView style={styles.content}>
        {currentPlace?.detail_situations.map((situation, index) => (
          <SituationDetailItem
            key={index}
            label={situation.name}
            sentences={situation.sentences}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SituationalExDetailScreen;
