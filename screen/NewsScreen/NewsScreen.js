import React, { useState, useEffect } from "react";
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
  const size = 10; // Page size
  const [newsPage, setNewsPage] = useState(0);
  const [scrapPage, setScrapPage] = useState(0);
  const [newsItems, setNewsItems] = useState([]);
  const [scrapItems, setScrapItems] = useState([]);
  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [hasMoreScrap, setHasMoreScrap] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch news data
  const {
    data: newsData,
    isLoading: isNewsDataLoading,
    isError: isNewsError,
    error: newsError,
    refetch: refetchNewsData,
  } = useNewsData(
    token,
    userData ? userData.default_language : "ENGLISH",
    newsPage,
    size
  );

  // Fetch scrap data
  const {
    data: scrapData,
    isLoading: isScrapDataLoading,
    refetch: refetchScrapData,
  } = useScrapData(
    token,
    userData ? userData.default_language : "ENGLISH",
    scrapPage,
    size
  );

  useEffect(() => {
    if (newsData && newsData.content) {
      const uniqueNews = newsData.content.filter(
        (nd) => !newsItems.find((item) => item.id === nd.id)
      );
      setNewsItems((prev) => [...prev, ...uniqueNews]);
      setHasMoreNews(!newsData.last);
    }
    if (scrapData && scrapData.content) {
      const uniqueScrap = scrapData.content.filter(
        (sd) => !scrapItems.find((item) => item.id === sd.id)
      );
      setScrapItems((prev) => [...prev, ...uniqueScrap]);
      setHasMoreScrap(!scrapData.last);
    }
  }, [newsData, scrapData]);

  useEffect(() => {
    if (refreshing) {
      refetchNewsData().then(() =>
        refetchScrapData().then(() => setRefreshing(false))
      );
    }
  }, [refreshing]);

  const onRefresh = async () => {
    setRefreshing(true);
    setNewsPage(0);
    setScrapPage(0);
    await Promise.all([refetchNewsData(), refetchScrapData()]);
    setRefreshing(false);
  };

  const loadMoreNews = () => {
    if (hasMoreNews) {
      setNewsPage((prev) => prev + 1);
    }
  };

  const loadMoreScrap = () => {
    if (hasMoreScrap) {
      setScrapPage((prev) => prev + 1);
    }
  };
  return (
    <View style={styles.container}>
      {/* Scrap Section */}
      <View style={styles.newsContainer}>
        <AppText style={styles.newsTitle}>Scrap</AppText>
        <FlatList
          data={scrapItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.newsContents}
              onPress={() =>
                navigation.navigate("NewsDetailScreen", {
                  idx: item.id,
                  publishData: item.publish_date.split("T")[0],
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
              <AppText style={styles.publishDate}>
                {item.publish_date.split("T")[0]}
              </AppText>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <AppText style={styles.emptyMessage}>No scrap news yet!</AppText>
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={loadMoreScrap}
          onEndReachedThreshold={0.5}
        />
      </View>
      {/* News Section */}
      <View style={styles.newsContainer}>
        <AppText style={styles.newsTitle}>News</AppText>
        <FlatList
          data={newsItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.newsContents}
              onPress={() =>
                navigation.navigate("NewsDetailScreen", {
                  idx: item.id,
                  publishData: item.publish_date.split("T")[0],
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
              <AppText style={styles.publishDate}>
                {item.publish_date.split("T")[0]}
              </AppText>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <AppText style={styles.emptyMessage}>No news yet!</AppText>
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={loadMoreNews}
          onEndReachedThreshold={0.5}
        />
      </View>
    </View>
  );
};

export default NewsScreen;
