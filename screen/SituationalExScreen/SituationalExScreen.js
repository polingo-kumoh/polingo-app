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

  const renderBanner = () => {
    if (!placeData || placeData.length === 0) return null;

    const bannerItem = placeData[0]; // 첫 번째 아이템을 배너로 사용
    return (
      <View style={styles.banner}>
        <View style={styles.iconView}>
          <Image
            source={{ uri: bannerItem.icon }}
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

  return (
    <View style={styles.container}>
      {renderBanner()}
      <FlatList
        data={formattedItems}
        renderItem={({ item }) =>
          item.empty ? (
            <View style={[styles.item, styles.itemInvisible]} />
          ) : (
            <SituationItem
              navigation={navigation}
              imageSource={{ uri: item.icon }}
              label={item.name}
            />
          )
        }
        keyExtractor={(item, index) => index.toString()}
        numColumns={5}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default SituationalExScreen;
