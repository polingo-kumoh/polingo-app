import React, { useState, useRef } from "react";
import { View, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { styles } from "./CarouselsSyles";

const MyCarousel = () => {
  const [images] = useState([
    require("../../../assets/images/carousel1.png"),
    require("../../../assets/images/carousel2.png"),
    require("../../../assets/images/carousel3.png"),
    // Add more images as needed
  ]);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.carouselView}>
      <Image source={item} style={styles.carouselImage} />
    </View>
  );

  return (
    <Carousel
      layout={"default"}
      ref={carouselRef}
      data={images}
      sliderWidth={300}
      itemWidth={300}
      renderItem={renderItem}
    />
  );
};

export default MyCarousel;
