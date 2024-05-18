import React from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "../../common/AppText";
import { styles } from "./SituationDetailItemStyle";
import { AntDesign } from "@expo/vector-icons";

const sentences = [
  {
    id: 1,
    text: "Can I have a coffee, please?",
    translation: "커피 한 잔 주세요.",
  },
  { id: 2, text: "Could I get the menu?", translation: "메뉴 좀 주시겠어요?" },
  {
    id: 3,
    text: "I'll have a sandwich.",
    translation: "샌드위치 하나 주세요.",
  },
  { id: 4, text: "Can I get a refill?", translation: "리필 가능할까요?" },
  {
    id: 5,
    text: "Do you have any vegetarian options?",
    translation: "채식 메뉴가 있나요?",
  },
  {
    id: 6,
    text: "I'd like to order a cappuccino and a slice of cheesecake.",
    translation: "카푸치노 한 잔과 치즈케이크 한 조각 주문할게요.",
  },
];

const SituationDetailItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subTitleView}>
        <AppText style={styles.subTitle}>주문</AppText>
      </View>
      {sentences.map((sentence, index) => (
        <View
          key={sentence.id}
          style={[
            styles.sentenceView,
            index === sentences.length - 1 && styles.lastSentence,
          ]}
        >
          <View style={styles.textContainer}>
            <AppText style={styles.text}>{sentence.text}</AppText>
            <AppText style={styles.textTrans}>{sentence.translation}</AppText>
          </View>
          <TouchableOpacity>
            <AntDesign name="sound" size={30} color="black" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default SituationDetailItem;
