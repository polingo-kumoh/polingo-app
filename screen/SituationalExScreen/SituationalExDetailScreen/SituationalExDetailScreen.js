// Inside SituationalExDetailScreen.js

import React, { useEffect, useState } from "react";
import { ScrollView, View, FlatList, TouchableOpacity } from "react-native";
import AppText from "../../../components/common/AppText";
import { styles } from "./SituationalExDetailScreenStyle";
import SituationDetailItem from "../../../components/component/SituationDetailItem/SituationDetailItem";

const labels = [
  "주문",
  "메뉴",
  "음료",
  "음식",
  "예시1",
  "예시2",
  "예시3",
  "예시4",
  // 더 많은 라벨 추가 가능
];

const SituationalExDetailScreen = ({ navigation, route }) => {
  const { label } = route.params;
  const [selectedLabel, setSelectedLabel] = useState(labels[0]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          <AppText style={styles.title}>{label}</AppText>
        </View>
      ),
    });
  }, []);

  const handleLabelPress = (label) => {
    setSelectedLabel(label);
    // 여기서 SituationDetailItem로 분기할 수 있음
  };

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
        <SituationDetailItem label={selectedLabel} />
        <SituationDetailItem label={selectedLabel} />
        <SituationDetailItem label={selectedLabel} />
        <SituationDetailItem label={selectedLabel} />
      </ScrollView>
    </View>
  );
};

export default SituationalExDetailScreen;
