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

import WordDetailModal from "../../../components/component/WordDetailMoal/WordDetailModal";

const NewsDetailScreen = ({ route }) => {
  const { token } = useAuth();
  const { idx, publishData } = route.params;
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
  const [isTranslationLoading, setIsTranslationLoading] = useState(false);
  const [isScrapLoading, setIsScrapLoading] = useState(false); // 스크랩 로딩 상태 추가

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
      setIsTranslationLoading(false);
    }
  }, [wordDetailData]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeaderTitle title={data?.title} />,
      headerRight: () => (
        <TouchableOpacity onPress={handleBookmark} disabled={isScrapLoading}>
          {isScrapLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Ionicons
              name={scrap ? "bookmark" : "bookmark-outline"}
              size={24}
              color="black"
            />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, data, scrap, isScrapLoading]);

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
    setIsScrapLoading(true); // 로딩 시작
    if (scrap) {
      newsUnscrap.mutate(
        { token, id: idx },
        {
          onSuccess: () => {
            setScrap(false);
            Alert.alert("언스크랩 성공", data?.title);
            setIsScrapLoading(false); // 로딩 끝
          },
          onError: (error) => {
            console.error("Error unscraping the news", error);
            Alert.alert(
              "Unscrap Failed",
              error.message || "Failed to unscrap the news"
            );
            setIsScrapLoading(false); // 로딩 끝
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
            setIsScrapLoading(false); // 로딩 끝
          },
          onError: (error) => {
            console.error("Error scraping the news", error);
            Alert.alert(
              "Scrap Failed",
              error.message || "Failed to scrap the news"
            );
            setIsScrapLoading(false); // 로딩 끝
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
    setIsModalVisible(true); // 모달창을 바로 보여줌
    setIsTranslationLoading(true); // 로딩스피너 활성화

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
          setIsTranslationLoading(false); // 로딩스피너 비활성화
        },
        onError: (err) => {
          Alert.alert("Translation Error", err.message);
          setActiveWordIndex(null);
          setIsTranslationLoading(false); // 로딩스피너 비활성화
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
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: data?.image_url }} style={styles.newImage} />
        <View style={styles.imgBottomSection}>
          <AppText style={styles.publishText}>{publishData}</AppText>
          <TouchableOpacity style={styles.linkView}>
            <AppText style={styles.linkText} onPress={handlePress}>
              원문 링크로 이동
            </AppText>
          </TouchableOpacity>
        </View>
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
                  {item.translated_text}
                </AppText>
                <AppText style={styles.grammerText}>{item.grammar}</AppText>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <WordDetailModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        wordDetailData={wordDetailData}
        translation={translation}
        isTranslationLoading={isTranslationLoading}
        navigation={navigation}
        setIsTranslationLoading={setIsTranslationLoading}
      />
    </View>
  );
};

export default NewsDetailScreen;
