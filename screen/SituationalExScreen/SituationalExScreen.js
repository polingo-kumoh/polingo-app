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
import 경기장 from "../../assets/situationIcon/경기장.png";
import 경찰서 from "../../assets/situationIcon/경찰서.png";
import 공원 from "../../assets/situationIcon/공원.png";
import 공항 from "../../assets/situationIcon/공항.png";
import 관광지 from "../../assets/situationIcon/관광지.png";
import 극장 from "../../assets/situationIcon/극장.png";
import 대중교통 from "../../assets/situationIcon/대중교통.png";
import 도서관 from "../../assets/situationIcon/도서관.png";
import 등산 from "../../assets/situationIcon/등산.png";
import 렌터카 from "../../assets/situationIcon/렌터카.png";
import 마트 from "../../assets/situationIcon/마트.png";
import 미용실 from "../../assets/situationIcon/미용실.png";
import 병원 from "../../assets/situationIcon/병원.png";
import 서점 from "../../assets/situationIcon/서점.png";
import 수영장 from "../../assets/situationIcon/수영장.png";
import 시장 from "../../assets/situationIcon/시장.png";
import 식당 from "../../assets/situationIcon/식당.png";
import 약국 from "../../assets/situationIcon/약국.png";
import 은행 from "../../assets/situationIcon/은행.png";
import 전시회 from "../../assets/situationIcon/전시회.png";
import 주유소 from "../../assets/situationIcon/주유소.png";
import 체육관 from "../../assets/situationIcon/체육관.png";
import 카페 from "../../assets/situationIcon/카페.png";
import 택시 from "../../assets/situationIcon/택시.png";
import 투어 from "../../assets/situationIcon/투어.png";
import 해변 from "../../assets/situationIcon/해변.png";
import 호텔 from "../../assets/situationIcon/호텔.png";

const images = {
  경기장,
  경찰서,
  공원,
  공항,
  관광지,
  극장,
  대중교통,
  도서관,
  등산,
  렌터카,
  마트,
  미용실,
  병원,
  서점,
  수영장,
  시장,
  식당,
  약국,
  은행,
  전시회,
  주유소,
  체육관,
  카페,
  택시,
  투어,
  해변,
  호텔,
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

    const bannerImageSource = images[bannerItem.name];

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

    const imageSource = images[item.name];

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
