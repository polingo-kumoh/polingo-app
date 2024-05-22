// SituationalExScreen.js
import React from "react";
import { View, TouchableOpacity, Image, FlatList } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./SituationalExScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import SituationItem from "../../components/component/SituationItem/SituationItem";

const items = [
  {
    id: 1,
    label: "공항",
    image: require("../../assets/situationIcon/공항.webp"),
  },
  {
    id: 2,
    label: "공원",
    image: require("../../assets/situationIcon/공원.webp"),
  },
  {
    id: 3,
    label: "극장",
    image: require("../../assets/situationIcon/극장.webp"),
  },
  {
    id: 4,
    label: "경기장",
    image: require("../../assets/situationIcon/경기장.webp"),
  },
  {
    id: 5,
    label: "경찰서",
    image: require("../../assets/situationIcon/경찰서.webp"),
  },
  {
    id: 6,
    label: "관광지",
    image: require("../../assets/situationIcon/관광지.webp"),
  },
  {
    id: 7,
    label: "도서관",
    image: require("../../assets/situationIcon/도서관.webp"),
  },
  {
    id: 8,
    label: "등산",
    image: require("../../assets/situationIcon/등산.webp"),
  },
  {
    id: 9,
    label: "렌터카",
    image: require("../../assets/situationIcon/렌터카.webp"),
  },
  {
    id: 10,
    label: "마트",
    image: require("../../assets/situationIcon/마트.webp"),
  },
  {
    id: 11,
    label: "미용실",
    image: require("../../assets/situationIcon/미용실.webp"),
  },
  {
    id: 12,
    label: "병원",
    image: require("../../assets/situationIcon/병원.webp"),
  },
  {
    id: 13,
    label: "서점",
    image: require("../../assets/situationIcon/서점.webp"),
  },
  {
    id: 14,
    label: "수영장",
    image: require("../../assets/situationIcon/수영장.webp"),
  },
  {
    id: 15,
    label: "식당",
    image: require("../../assets/situationIcon/식당.webp"),
  },
  {
    id: 16,
    label: "시장",
    image: require("../../assets/situationIcon/시장.webp"),
  },
  {
    id: 17,
    label: "약국",
    image: require("../../assets/situationIcon/약국.webp"),
  },
  {
    id: 18,
    label: "은행",
    image: require("../../assets/situationIcon/은행.webp"),
  },
  {
    id: 19,
    label: "전시회",
    image: require("../../assets/situationIcon/전시회.webp"),
  },
  {
    id: 20,
    label: "주유소",
    image: require("../../assets/situationIcon/주유소.webp"),
  },
  {
    id: 21,
    label: "카페",
    image: require("../../assets/situationIcon/카페.webp"),
  },
  {
    id: 22,
    label: "택시",
    image: require("../../assets/situationIcon/택시.webp"),
  },
  {
    id: 23,
    label: "투어",
    image: require("../../assets/situationIcon/투어.webp"),
  },
  {
    id: 24,
    label: "호텔",
    image: require("../../assets/situationIcon/호텔.webp"),
  },
  {
    id: 25,
    label: "해변",
    image: require("../../assets/situationIcon/해변.webp"),
  },
  {
    id: 26,
    label: "대중교통",
    image: require("../../assets/situationIcon/대중교통.webp"),
  },
  {
    id: 27,
    label: "체육관",
    image: require("../../assets/situationIcon/체육관.webp"),
  },
];

const formatItems = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ id: `empty-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const SituationalExScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.iconView}>
          <Image
            source={require("../../assets/situationIcon/공항.webp")}
            style={styles.bannerImg}
            resizeMode="contain"
          />
        </View>
        <View>
          <AppText style={styles.bannerText}>
            공항에서의 회화가 필요하시나요?
          </AppText>
          <AppText style={styles.bannerText}>
            Polingo에서 회화집을 확인하세요.
          </AppText>
          <TouchableOpacity
            style={styles.bannerBtn}
            onPress={() =>
              navigation.navigate("SituationalExDetailScreen", {
                label: "공항",
              })
            }
          >
            <AppText style={styles.btnText}>공항 회화집으로 이동</AppText>
            <AntDesign name="rightcircle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={formatItems(items, 5)}
        renderItem={({ item }) =>
          item.empty ? (
            <View style={[styles.item, styles.itemInvisible]} />
          ) : (
            <SituationItem
              navigation={navigation}
              imageSource={item.image}
              label={item.label}
            />
          )
        }
        keyExtractor={(item) => item.id.toString()}
        numColumns={5}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default SituationalExScreen;
