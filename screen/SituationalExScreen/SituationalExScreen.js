// SituationalExScreen.js
import React from "react";
import { View, TouchableOpacity, Image, FlatList } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./SituationalExScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import SituationItem from "../../components/component/SituationItem/SituationItem";
import { usePlaceEx } from "../../hooks/usePlaceEx";
import { useAuth } from "../../config/AuthContext";
import { useUserData } from "../../hooks/useUserData";

// Import all images statically
const images = {
  경기장: require("../../assets/situationIcon/경기장.png"),
  경찰서: require("../../assets/situationIcon/경찰서.png"),
  공원: require("../../assets/situationIcon/공원.png"),
  공항: require("../../assets/situationIcon/공항.png"),
  관광지: require("../../assets/situationIcon/관광지.png"),
  극장: require("../../assets/situationIcon/극장.png"),
  대중교통: require("../../assets/situationIcon/대중교통.png"),
  도서관: require("../../assets/situationIcon/도서관.png"),
  등산: require("../../assets/situationIcon/등산.png"),
  렌터카: require("../../assets/situationIcon/렌터카.png"),
  마트: require("../../assets/situationIcon/마트.png"),
  미용실: require("../../assets/situationIcon/미용실.png"),
  병원: require("../../assets/situationIcon/병원.png"),
  서점: require("../../assets/situationIcon/서점.png"),
  수영장: require("../../assets/situationIcon/수영장.png"),
  시장: require("../../assets/situationIcon/시장.png"),
  식당: require("../../assets/situationIcon/식당.png"),
  약국: require("../../assets/situationIcon/약국.png"),
  은행: require("../../assets/situationIcon/은행.png"),
  전시회: require("../../assets/situationIcon/전시회.png"),
  주유소: require("../../assets/situationIcon/주유소.png"),
  체육관: require("../../assets/situationIcon/체육관.png"),
  카페: require("../../assets/situationIcon/카페.png"),
  택시: require("../../assets/situationIcon/택시.png"),
  투어: require("../../assets/situationIcon/투어.png"),
  해변: require("../../assets/situationIcon/해변.png"),
  호텔: require("../../assets/situationIcon/호텔.png"),
};

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

const getRandomItem = (data) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
};

const SituationalExScreen = ({ navigation }) => {
  const { token } = useAuth();
  const { data: userData } = useUserData(token);
  const {
    data: placeData,
    isError,
    error,
  } = usePlaceEx(token, userData?.default_language);

  if (isError) {
    return (
      <View style={styles.container}>
        <AppText style={styles.errorText}>Error: {error.message}</AppText>
      </View>
    );
  }

  const formattedItems = placeData ? formatItems(placeData, 5) : [];
  const bannerItem = placeData ? getRandomItem(placeData) : null;

  const renderBanner = () => {
    if (!bannerItem) return null;

    const bannerImageSource =
      images[bannerItem.name] ||
      images[`${bannerItem.name}_png`] ||
      images[`${bannerItem.name}_webp`];

    return (
      <View style={styles.banner}>
        <View style={styles.iconView}>
          <Image
            source={bannerImageSource}
            style={styles.bannerImg}
            resizeMode="contain"
          />
        </View>
        <View>
          <AppText style={styles.bannerText}>
            {bannerItem.name}에서의 회화가 필요하시나요?
          </AppText>
          <AppText style={styles.bannerText}>
            Polingo에서 회화집을 확인하세요.
          </AppText>
          <TouchableOpacity
            style={styles.bannerBtn}
            onPress={() =>
              navigation.navigate("SituationalExDetailScreen", {
                label: bannerItem.name,
              })
            }
          >
            <AppText style={styles.btnText}>
              {bannerItem.name} 회화집으로 이동
            </AppText>
            <AntDesign name="rightcircle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    if (item.empty) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    const imageSource =
      images[item.name] ||
      images[`${item.name}_png`] ||
      images[`${item.name}_webp`];

    return (
      <SituationItem
        navigation={navigation}
        imageSource={imageSource}
        label={item.name}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderBanner()}
      <FlatList
        data={formattedItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={5}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default SituationalExScreen;
