import React, { useEffect, useState, useRef } from "react";
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

  const [selectedLabel, setSelectedLabel] = useState("전체");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (placeData) {
      const defaultLabel = "전체";
      setSelectedLabel(defaultLabel);
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

  const filterSituationsByLabel = (label) => {
    if (placeData) {
      const currentPlace = placeData.find((item) => item.name === label);
      if (currentPlace) {
        if (selectedLabel === "전체") {
          return currentPlace.detail_situations;
        }
        const filtered = currentPlace.detail_situations.filter(
          (situation) => situation.name === selectedLabel
        );
        return filtered;
      }
    }
    return [];
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
    ? [
        "전체",
        ...currentPlace.detail_situations.map((situation) => situation.name),
      ]
    : ["전체"];

  const filteredSituations = filterSituationsByLabel(label);

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

      <ScrollView
        ref={scrollViewRef}
        style={selectedLabel === "전체" ? null : styles.content}
      >
        {filteredSituations.map((situation, index) => (
          <View key={index}>
            <SituationDetailItem
              label={situation.name}
              sentences={situation.sentences}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SituationalExDetailScreen;
