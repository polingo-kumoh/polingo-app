import React, { useRef, useState } from "react";
import { View, Image, Text } from "react-native";
import Carousel from "react-native-snap-carousel";
import theme from "./../../../config/theme";
import { styles } from "./CarouselsSyles";
import AppText from "../../common/AppText";
import DynamicText from "../DynamicText/DynamicText";
import DynamicTextOneLine from "./../DynamicTextOneLine/DynamicTextOneLine";

const HomeCarousel = (props) => {
  const { items } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.carouselView}>
      <Image source={item.source} style={styles.carouselImage} />
      <View style={styles.overlayView} />
      <View style={styles.overlayTextView}>
        <View style={styles.overlayTitle}>
          <AppText style={styles.regionText}>{item.region}</AppText>
          <AppText style={styles.temperatureText}>{item.temperature}</AppText>
        </View>
        <DynamicText style={styles.exampleSentence}>
          {item.example_sentence1}
        </DynamicText>
        <DynamicTextOneLine style={styles.exampleSentenceTranslation}>
          {item.example_sentence1_translate}
        </DynamicTextOneLine>
        <DynamicText style={styles.exampleSentence}>
          {item.example_sentence2}
        </DynamicText>
        <DynamicTextOneLine style={styles.exampleSentenceTranslation}>
          {item.example_sentence2_translate}
        </DynamicTextOneLine>
      </View>
    </View>
  );

  return (
    <View>
      <Carousel
        layout={"default"}
        ref={carouselRef}
        data={items}
        sliderWidth={theme.screenWidth - 40}
        itemWidth={300}
        renderItem={renderItem}
        loop={true}
        loopClonesPerSide={items.length}
        onSnapToItem={(index) => setActiveIndex(index % items.length)}
      />
      <View style={styles.indicatorContainer}>
        {items.map((item, index) => (
          <Text
            key={index}
            style={[
              styles.indicator,
              { color: index === activeIndex ? "white" : "lightgray" },
            ]}
          >
            {index === activeIndex ? "●" : "○"}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default HomeCarousel;
