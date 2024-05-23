// Inside SituationalExDetailScreen.js

import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
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
  const scrollViewRef = useRef(null);
  const itemOffsets = useRef([]);

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

  const handleLabelPress = (label, index) => {
    setSelectedLabel(label);
    scrollViewRef.current?.scrollTo({
      y: itemOffsets.current[index],
      animated: true,
    });
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    let closestIndex = 0;

    itemOffsets.current.forEach((offset, index) => {
      if (scrollPosition >= offset) {
        closestIndex = index;
      }
    });

    const newLabel = currentPlace.detail_situations[closestIndex]?.name;
    if (newLabel !== selectedLabel) {
      setSelectedLabel(newLabel);
    }
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
    ? currentPlace.detail_situations.map((situation, index) => ({
        name: situation.name,
        index: index,
      }))
    : [];

  return (
    <View style={styles.container}>
      <FlatList
        data={labels}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.labelItem}
            onPress={() => handleLabelPress(item.name, item.index)}
          >
            <View style={styles.labelContainer}>
              <AppText
                style={[
                  styles.labelText,
                  item.name === selectedLabel && styles.selectedLabelText,
                ]}
              >
                {item.name}
              </AppText>
              {item.name === selectedLabel && <View style={styles.underline} />}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.labelList}
      />

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.content}
      >
        {currentPlace?.detail_situations.map((situation, index) => (
          <View
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              itemOffsets.current[index] = layout.y;
            }}
            key={index}
          >
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
