import React from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./SituationDetailItemStyle";

const SituationDetailItem = ({ label, sentences }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subTitleView}>
        <AppText style={styles.subTitle}>{label}</AppText>
      </View>
      {sentences.map((sentence, index) => (
        <View
          key={index}
          style={[
            styles.sentenceView,
            index === sentences.length - 1 && styles.lastSentence,
          ]}
        >
          <View style={styles.textContainer}>
            <AppText style={styles.text}>{sentence.sentence}</AppText>
            <AppText style={styles.textTrans}>{sentence.translate}</AppText>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SituationDetailItem;
