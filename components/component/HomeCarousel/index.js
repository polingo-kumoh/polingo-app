import React, { useRef, useState } from "react";
import { View, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import theme from "./../../../config/theme";
import { styles } from "./CarouselsSyles";
import AppText from "../../common/AppText";

const HomeCarousel = (props) => {
  const { items } = props;
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.carouselView}>
      <Image source={item.source} style={styles.carouselImage} />
      <View style={styles.overlayTextView}>
        <View style={styles.overlayTitle}>
          <AppText style={styles.regionText}>{item.region}</AppText>
          <AppText style={styles.temperatureText}>{item.temperature}</AppText>
        </View>
        <AppText style={styles.exampleSentence}>
          {item.example_sentence1}
        </AppText>
        <AppText style={styles.exampleSentenceTranslation}>
          {item.example_sentence1_translate}
        </AppText>
        <AppText style={styles.exampleSentence}>
          {item.example_sentence2}
        </AppText>
        <AppText style={styles.exampleSentenceTranslation}>
          {item.example_sentence2_translate}
        </AppText>
      </View>
    </View>
  );

  return (
    <Carousel
      layout={"default"}
      ref={carouselRef}
      data={items}
      sliderWidth={theme.screenWidth - 40}
      itemWidth={300}
      renderItem={renderItem}
    />
  );
};

export default HomeCarousel;
