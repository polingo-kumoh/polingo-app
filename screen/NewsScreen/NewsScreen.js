import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./NewsScreenStyle";
import { useNewsData } from "../../hooks/useNewsData";
import { useAuth } from "../../config/AuthContext";
import { useUserData } from "../../hooks/useUserData";
import { useScrapData } from "../../hooks/useScrapData";

const NewsScreen = ({ navigation }) => {
  const { token } = useAuth();
  const { data: userData, isLoading: isUserLoading } = useUserData(token);
  const size = 10;
  const isLoading = isUserLoading;
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: newsData,
    isLoading: isNewsDataLoading,
    isError,
    error,
    refetch: refetchNewsData,
  } = useNewsData(
    token,
    userData ? userData.default_language : "ENGLISH",
    0,
    size
  );

  const {
    data: scrapData,
    isLoading: isScrapDataLoading,
    refetch: refetchScrapData,
  } = useScrapData(
    token,
    userData ? userData.default_language : "ENGLISH",
    0,
    size
  );

  const onRefresh = () => {
    setRefreshing(true);

    Promise.all([refetchNewsData(), refetchScrapData()])
      .then(() => {
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Failed to refresh data:", error);
        setRefreshing(false);
      });
  };

  if (isLoading || isNewsDataLoading || isScrapDataLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <AppText>Failed to load data: {error.message}</AppText>
      </View>
    );
  }

  // Check if there's no content to display
  if (
    (!newsData || !newsData.content.length) &&
    (!scrapData || !scrapData.content.length)
  ) {
    return (
      <View style={styles.errorContainer}>
        <AppText>아직 뉴스가 없어요!</AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.newsContainer}>
        <AppText style={styles.newsTitle}>Scrap</AppText>
        <FlatList
          data={scrapData.content}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.newsContents}
              onPress={() =>
                navigation.navigate("NewsDetailScreen", {
                  idx: item.id,
                })
              }
            >
              <Image
                source={{ uri: item.image_url }}
                style={styles.newsImage}
              />
              <View style={styles.newsTextContainer}>
                <AppText
                  style={styles.newsContentTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </AppText>
                <AppText
                  style={styles.newsContentsContent}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item.first_sentence}
                </AppText>
              </View>
              <AppText style={styles.publishDate}>{item.publish_date}</AppText>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <AppText style={styles.emptyMessage}>
              아직 스크랩 뉴스가 없어요!
            </AppText>
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
      <View style={styles.newsContainer}>
        <AppText style={styles.newsTitle}>News</AppText>
        <FlatList
          data={newsData.content}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.newsContents}
              onPress={() =>
                navigation.navigate("NewsDetailScreen", {
                  idx: item.id,
                })
              }
            >
              <Image
                source={{ uri: item.image_url }}
                style={styles.newsImage}
              />
              <View style={styles.newsTextContainer}>
                <AppText
                  style={styles.newsContentTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </AppText>
                <AppText
                  style={styles.newsContentsContent}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item.first_sentence}
                </AppText>
              </View>
              <AppText style={styles.publishDate}>{item.publish_date}</AppText>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <AppText style={styles.emptyMessage}>아직 뉴스가 없어요!</AppText>
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </View>
  );
};

export default NewsScreen;
