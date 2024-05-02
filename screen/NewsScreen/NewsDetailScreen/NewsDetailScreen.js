import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Linking,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./NewsDetailScreenStyle";
import AppText from "../../../components/common/AppText";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { useTextTranslate } from "./../../../hooks/useTextTranslate";
import { useAuth } from "./../../../config/AuthContext";
import { useUserData } from "../../../hooks/useUserData";
import { useDetailNewsData } from "../../../hooks/useDetailNewsData";
import { useNewsScrap } from "../../../hooks/useNewsScrap";
import { useNewsUnscrap } from "../../../hooks/useNewsUnscrap";
import { useWordDetailData } from "../../../hooks/useWordDetailData";

const NewsDetailScreen = ({ route }) => {
  const { token } = useAuth();
  const { idx } = route.params;
  const navigation = useNavigation();
  const newsScrap = useNewsScrap();
  const newsUnscrap = useNewsUnscrap();
  const { data: userData } = useUserData(token);
  const [wordToFetch, setWordToFetch] = useState(null);
  const { data: wordDetailData, isLoading: isWordDetailLoading } =
    useWordDetailData(token, userData.default_language, wordToFetch);
  const { data, isLoading, isError, error } = useDetailNewsData(token, idx);
  const { mutate: translateText } = useTextTranslate();

  const [expandedSections, setExpandedSections] = useState({});
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const [translation, setTranslation] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scrap, setScrap] = useState(false);

  const CustomHeaderTitle = ({ title }) => {
    return (
      <AppText
        style={styles.headerTitle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </AppText>
    );
  };

  useEffect(() => {
    if (wordDetailData) {
      setIsModalVisible(true);
      setActiveWordIndex(null);
    }
  }, [wordDetailData]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeaderTitle title={data?.title} />,
      headerRight: () => (
        <TouchableOpacity onPress={handleBookmark}>
          <Ionicons
            name={scrap ? "bookmark" : "bookmark-outline"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, data, scrap]);

  useEffect(() => {
    if (data) {
      setScrap(data.is_scraped);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.errorContainer}>
        <AppText>
          Failed to load the news detail:{" "}
          {error ? error.message : "No data available"}
        </AppText>
      </View>
    );
  }

  const handleBookmark = () => {
    if (scrap) {
      newsUnscrap.mutate(
        { token, id: idx },
        {
          onSuccess: () => {
            setScrap(false);
            Alert.alert("언스크랩 성공", data?.title);
          },
          onError: (error) => {
            console.error("Error unscraping the news", error);
            Alert.alert(
              "Unscrap Failed",
              error.message || "Failed to unscrap the news"
            );
          },
        }
      );
    } else {
      newsScrap.mutate(
        { token, id: idx },
        {
          onSuccess: () => {
            setScrap(true);
            Alert.alert("스크랩 성공", data?.title);
          },
          onError: (error) => {
            console.error("Error scraping the news", error);
            Alert.alert(
              "Scrap Failed",
              error.message || "Failed to scrap the news"
            );
          },
        }
      );
    }
  };

  const toggleSection = (index) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [index]: !prevExpandedSections[index],
    }));
  };

  const handlePress = async () => {
    const url = data.link;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`URL이 존재하지 않습니다.: ${url}`);
    }
  };
  const handleWordPress = (index) => {
    setActiveWordIndex(index);
  };

  const handleLongPress = async (word) => {
    const cleanedWord = word.replace(
      /[^\w\s\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF]/gi,
      ""
    );

    translateText(
      {
        token,
        text: cleanedWord,
        default_language: userData.default_language,
      },
      {
        onSuccess: async (data) => {
          setWordToFetch(data.original_text);
          setTranslation(data.translated_text);
        },
        onError: (err) => {
          Alert.alert("Translation Error", err.message);
          setActiveWordIndex(null);
        },
      }
    );
  };

  const clearActiveWord = () => {
    setActiveWordIndex(null);
  };

  const renderTextWithPressableWords = (text, sentenceIndex) => {
    return text.split(" ").map((word, wordIndex) => {
      const index = `${sentenceIndex}-${wordIndex}`;
      const isWordActive = activeWordIndex === index;
      return (
        <Pressable
          key={`${index}-${isWordActive}`}
          onPressIn={() => handleWordPress(index)}
          onLongPress={() => handleLongPress(word)}
          onPressOut={clearActiveWord}
        >
          <AppText style={[styles.word, isWordActive && styles.activeWord]}>
            {word + " "}
          </AppText>
        </Pressable>
      );
    });
  };

  const renderModalContent = () => {
    if (isWordDetailLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    if (wordDetailData) {
      return (
        <>
          <View style={styles.originView}>
            <AppText style={styles.modalOriginal}>
              {wordDetailData.word}
            </AppText>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate("WordAddScreen", {
                  word: wordDetailData.word,
                  description: translation,
                });
              }}
            >
              <Ionicons name="bookmark-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <AppText style={styles.modalTrans}>trans. {translation}</AppText>
          <AppText style={styles.modalText}>
            {wordDetailData.description}
          </AppText>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setIsModalVisible(false)}
          >
            <AppText style={styles.textStyle}>닫기</AppText>
          </Pressable>
        </>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: data?.image_url }} style={styles.newImage} />

        <TouchableOpacity style={styles.linkView}>
          <AppText style={styles.linkText} onPress={handlePress}>
            원문 링크로 이동
          </AppText>
        </TouchableOpacity>
        <AppText style={styles.articleTitle}>{data?.title}</AppText>
        {data.sentences?.map((item) => (
          <View key={item.sentence_id}>
            <View style={styles.sentence}>
              {renderTextWithPressableWords(
                item.original_text,
                item.sentence_id
              )}
              <Pressable
                onPress={() => toggleSection(item.sentence_id)}
                style={styles.dropDown}
              >
                <AntDesign
                  name={
                    expandedSections[item.sentence_id] ? "caretup" : "caretdown"
                  }
                  size={18}
                  color="black"
                />
              </Pressable>
            </View>
            {expandedSections[item.sentence_id] && (
              <View>
                <AppText style={styles.translationText}>
                  trans. {item.translated_text}
                </AppText>
                <AppText style={styles.grammerText}>{item.grammers}</AppText>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("모달이 닫힙니다.");
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{renderModalContent()}</View>
        </View>
      </Modal>
    </View>
  );
};

export default NewsDetailScreen;