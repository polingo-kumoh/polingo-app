// Inside HomeScreen.js

import React from "react";
import { View, TouchableOpacity, Image, FlatList } from "react-native";
import AppText from "../../components/common/AppText";
import { styles } from "./NewsScreenStyle";
import moment from "moment";

const NewsScreen = ({ navigation }) => {
  const newsItems = Array.from({ length: 10 }, (_, index) => ({
    id: String(index),
    title: "Ousted South...",
    content:
      "According to a document supplied exclusively to CNN by Park's international",
    image: require("../../assets/images/박근혜.png"),
    publishDate: moment().subtract(index, "days").format("MMM Do YYYY"),
  }));
  return (
    <View style={styles.container}>
      <View style={styles.newsContainer}>
        <AppText style={styles.newsTitle}>Scrap</AppText>
        <FlatList
          data={newsItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.newsContents}
              onPress={() =>
                navigation.navigate("NewsDetailScreen", {
                  idx: item.id,
                  title: item.title,
                })
              }
            >
              <Image source={item.image} style={styles.newsImage} />
              <View style={styles.newsTextContainer}>
                <AppText style={styles.newsContentTitle}>{item.title}</AppText>
                <AppText style={styles.newsContentsContent}>
                  {item.content}
                </AppText>
              </View>
              <AppText style={styles.publishDate}>{item.publishDate}</AppText>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.newsContainer}>
        <AppText style={styles.newsTitle}>News</AppText>
        <FlatList
          data={newsItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.newsContents}
              onPress={() =>
                navigation.navigate("NewsDetailScreen", { idx: item.idx })
              }
            >
              <Image source={item.image} style={styles.newsImage} />
              <View style={styles.newsTextContainer}>
                <AppText style={styles.newsContentTitle}>{item.title}</AppText>
                <AppText style={styles.newsContentsContent}>
                  {item.content}
                </AppText>
              </View>
              <AppText style={styles.publishDate}>{item.publishDate}</AppText>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default NewsScreen;
