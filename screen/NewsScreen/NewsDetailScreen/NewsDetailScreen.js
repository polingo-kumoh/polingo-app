import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./NewsDetailScreenStyle";
import AppText from "../../../components/common/AppText";
import { AntDesign } from "@expo/vector-icons";

import { useTextTranslate } from "./../../../hooks/useTextTranslate";
import { useAuth } from "./../../../config/AuthContext";

const NewsDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { idx } = route.params;
  const { token, default_language } = useAuth();
  const [expandedSections, setExpandedSections] = useState({});
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const [pressTimeoutId, setPressTimeoutId] = useState(null);
  const [translation, setTranslation] = useState("");
  const {
    mutate: translateText,
    isLoading,
    isError,
    error,
  } = useTextTranslate();
  const data = {
    article_image: require("../../../assets/images/박근혜.png"),
    article_title:
      "Ousted South Korean president suffering in jail, lawyers say",
    article_url: "https://www.kumoh.ac.kr",
    article_content_sentence: [
      {
        origin_text:
          "Lawyers representing former South Korean president Park Geun-hye have accused authorities of committing “serious human rights violations” against the now-disgraced leader, who is awaiting trial on charges of corruption and abuse of power.",
        translated_text:
          "박근혜 전 대통령을 대리하는 변호사들은 부패와 권력 남용 혐의로 재판을 기다리고 있는 전 대통령에 대해 당국이 '심각한 인권 침해'를 저질렀다고 비난했습니다.",
        grammers: `복합 명사구 (Complex noun phrase):
        "Lawyers representing former South Korean president Park Geun-hye"는 복합 명사구로, 'representing former South Korean president Park Geun-hye'는 'Lawyers'를 수식하는 형용사 절입니다. 이 절은 변호사들이 어떤 인물을 대리하고 있는지를 설명합니다.
        현재분사구 (Present participle phrase):
        "representing former South Korean president Park Geun-hye"에서 'representing'은 현재분사로 사용되어 변호사들이 수행하는 동작을 나타냅니다.
        인칭 대명사 (Personal pronoun):
        "who is awaiting trial on charges of corruption and abuse of power"에서 'who'는 앞서 언급한 'Park Geun-hye'를 대체하는 인칭 대명사로 사용됩니다. 이는 복잡한 문장에서 특정 인물을 지칭할 때 유용하게 사용됩니다.
        복합 전치사구 (Complex prepositional phrase):
        "on charges of corruption and abuse of power"는 'charges'를 설명하는 전치사구로, 'corruption'과 'abuse of power'라는 두 가지 혐의에 대해 언급하고 있습니다.
        수동태 (Passive voice):
        "have accused authorities of committing"에서 'have accused'는 현재완료형의 수동태로 사용되어, 누가 무엇을 했는지보다는 어떤 행동이 일어났는지에 초점을 맞춥니다.`,
      },
      {
        origin_text:
          "Lawyers representing former South Korean president Park Geun-hye have accused authorities of committing “serious human rights violations” against the now-disgraced leader, who is awaiting trial on charges of corruption and abuse of power.",
        translated_text:
          "박근혜 전 대통령을 대리하는 변호사들은 부패와 권력 남용 혐의로 재판을 기다리고 있는 전 대통령에 대해 당국이 '심각한 인권 침해'를 저질렀다고 비난했습니다.",
        grammers: `복합 명사구 (Complex noun phrase):
        "Lawyers representing former South Korean president Park Geun-hye"는 복합 명사구로, 'representing former South Korean president Park Geun-hye'는 'Lawyers'를 수식하는 형용사 절입니다. 이 절은 변호사들이 어떤 인물을 대리하고 있는지를 설명합니다.
        현재분사구 (Present participle phrase):
        "representing former South Korean president Park Geun-hye"에서 'representing'은 현재분사로 사용되어 변호사들이 수행하는 동작을 나타냅니다.
        인칭 대명사 (Personal pronoun):
        "who is awaiting trial on charges of corruption and abuse of power"에서 'who'는 앞서 언급한 'Park Geun-hye'를 대체하는 인칭 대명사로 사용됩니다. 이는 복잡한 문장에서 특정 인물을 지칭할 때 유용하게 사용됩니다.
        복합 전치사구 (Complex prepositional phrase):
        "on charges of corruption and abuse of power"는 'charges'를 설명하는 전치사구로, 'corruption'과 'abuse of power'라는 두 가지 혐의에 대해 언급하고 있습니다.
        수동태 (Passive voice):
        "have accused authorities of committing"에서 'have accused'는 현재완료형의 수동태로 사용되어, 누가 무엇을 했는지보다는 어떤 행동이 일어났는지에 초점을 맞춥니다.`,
      },
      {
        origin_text:
          "Lawyers representing former South Korean president Park Geun-hye have accused authorities of committing “serious human rights violations” against the now-disgraced leader, who is awaiting trial on charges of corruption and abuse of power.",
        translated_text:
          "박근혜 전 대통령을 대리하는 변호사들은 부패와 권력 남용 혐의로 재판을 기다리고 있는 전 대통령에 대해 당국이 '심각한 인권 침해'를 저질렀다고 비난했습니다.",
        grammers: `복합 명사구 (Complex noun phrase):
        "Lawyers representing former South Korean president Park Geun-hye"는 복합 명사구로, 'representing former South Korean president Park Geun-hye'는 'Lawyers'를 수식하는 형용사 절입니다. 이 절은 변호사들이 어떤 인물을 대리하고 있는지를 설명합니다.
        현재분사구 (Present participle phrase):
        "representing former South Korean president Park Geun-hye"에서 'representing'은 현재분사로 사용되어 변호사들이 수행하는 동작을 나타냅니다.
        인칭 대명사 (Personal pronoun):
        "who is awaiting trial on charges of corruption and abuse of power"에서 'who'는 앞서 언급한 'Park Geun-hye'를 대체하는 인칭 대명사로 사용됩니다. 이는 복잡한 문장에서 특정 인물을 지칭할 때 유용하게 사용됩니다.
        복합 전치사구 (Complex prepositional phrase):
        "on charges of corruption and abuse of power"는 'charges'를 설명하는 전치사구로, 'corruption'과 'abuse of power'라는 두 가지 혐의에 대해 언급하고 있습니다.
        수동태 (Passive voice):
        "have accused authorities of committing"에서 'have accused'는 현재완료형의 수동태로 사용되어, 누가 무엇을 했는지보다는 어떤 행동이 일어났는지에 초점을 맞춥니다.`,
      },
      {
        origin_text:
          "Lawyers representing former South Korean president Park Geun-hye have accused authorities of committing “serious human rights violations” against the now-disgraced leader, who is awaiting trial on charges of corruption and abuse of power.",
        translated_text:
          "박근혜 전 대통령을 대리하는 변호사들은 부패와 권력 남용 혐의로 재판을 기다리고 있는 전 대통령에 대해 당국이 '심각한 인권 침해'를 저질렀다고 비난했습니다.",
        grammers: `복합 명사구 (Complex noun phrase):
        "Lawyers representing former South Korean president Park Geun-hye"는 복합 명사구로, 'representing former South Korean president Park Geun-hye'는 'Lawyers'를 수식하는 형용사 절입니다. 이 절은 변호사들이 어떤 인물을 대리하고 있는지를 설명합니다.
        현재분사구 (Present participle phrase):
        "representing former South Korean president Park Geun-hye"에서 'representing'은 현재분사로 사용되어 변호사들이 수행하는 동작을 나타냅니다.
        인칭 대명사 (Personal pronoun):
        "who is awaiting trial on charges of corruption and abuse of power"에서 'who'는 앞서 언급한 'Park Geun-hye'를 대체하는 인칭 대명사로 사용됩니다. 이는 복잡한 문장에서 특정 인물을 지칭할 때 유용하게 사용됩니다.
        복합 전치사구 (Complex prepositional phrase):
        "on charges of corruption and abuse of power"는 'charges'를 설명하는 전치사구로, 'corruption'과 'abuse of power'라는 두 가지 혐의에 대해 언급하고 있습니다.
        수동태 (Passive voice):
        "have accused authorities of committing"에서 'have accused'는 현재완료형의 수동태로 사용되어, 누가 무엇을 했는지보다는 어떤 행동이 일어났는지에 초점을 맞춥니다.`,
      },
      {
        origin_text:
          "Lawyers representing former South Korean president Park Geun-hye have accused authorities of committing “serious human rights violations” against the now-disgraced leader, who is awaiting trial on charges of corruption and abuse of power.",
        translated_text:
          "박근혜 전 대통령을 대리하는 변호사들은 부패와 권력 남용 혐의로 재판을 기다리고 있는 전 대통령에 대해 당국이 '심각한 인권 침해'를 저질렀다고 비난했습니다.",
        grammers: `복합 명사구 (Complex noun phrase):
        "Lawyers representing former South Korean president Park Geun-hye"는 복합 명사구로, 'representing former South Korean president Park Geun-hye'는 'Lawyers'를 수식하는 형용사 절입니다. 이 절은 변호사들이 어떤 인물을 대리하고 있는지를 설명합니다.
        현재분사구 (Present participle phrase):
        "representing former South Korean president Park Geun-hye"에서 'representing'은 현재분사로 사용되어 변호사들이 수행하는 동작을 나타냅니다.
        인칭 대명사 (Personal pronoun):
        "who is awaiting trial on charges of corruption and abuse of power"에서 'who'는 앞서 언급한 'Park Geun-hye'를 대체하는 인칭 대명사로 사용됩니다. 이는 복잡한 문장에서 특정 인물을 지칭할 때 유용하게 사용됩니다.
        복합 전치사구 (Complex prepositional phrase):
        "on charges of corruption and abuse of power"는 'charges'를 설명하는 전치사구로, 'corruption'과 'abuse of power'라는 두 가지 혐의에 대해 언급하고 있습니다.
        수동태 (Passive voice):
        "have accused authorities of committing"에서 'have accused'는 현재완료형의 수동태로 사용되어, 누가 무엇을 했는지보다는 어떤 행동이 일어났는지에 초점을 맞춥니다.`,
      },
      {
        origin_text:
          "Lawyers representing former South Korean president Park Geun-hye have accused authorities of committing “serious human rights violations” against the now-disgraced leader, who is awaiting trial on charges of corruption and abuse of power.",
        translated_text:
          "박근혜 전 대통령을 대리하는 변호사들은 부패와 권력 남용 혐의로 재판을 기다리고 있는 전 대통령에 대해 당국이 '심각한 인권 침해'를 저질렀다고 비난했습니다.",
        grammers: `복합 명사구 (Complex noun phrase):
        "Lawyers representing former South Korean president Park Geun-hye"는 복합 명사구로, 'representing former South Korean president Park Geun-hye'는 'Lawyers'를 수식하는 형용사 절입니다. 이 절은 변호사들이 어떤 인물을 대리하고 있는지를 설명합니다.
        현재분사구 (Present participle phrase):
        "representing former South Korean president Park Geun-hye"에서 'representing'은 현재분사로 사용되어 변호사들이 수행하는 동작을 나타냅니다.
        인칭 대명사 (Personal pronoun):
        "who is awaiting trial on charges of corruption and abuse of power"에서 'who'는 앞서 언급한 'Park Geun-hye'를 대체하는 인칭 대명사로 사용됩니다. 이는 복잡한 문장에서 특정 인물을 지칭할 때 유용하게 사용됩니다.
        복합 전치사구 (Complex prepositional phrase):
        "on charges of corruption and abuse of power"는 'charges'를 설명하는 전치사구로, 'corruption'과 'abuse of power'라는 두 가지 혐의에 대해 언급하고 있습니다.
        수동태 (Passive voice):
        "have accused authorities of committing"에서 'have accused'는 현재완료형의 수동태로 사용되어, 누가 무엇을 했는지보다는 어떤 행동이 일어났는지에 초점을 맞춥니다.`,
      },
      {
        origin_text:
          "Lawyers representing former South Korean president Park Geun-hye have accused authorities of committing “serious human rights violations” against the now-disgraced leader, who is awaiting trial on charges of corruption and abuse of power.",
        translated_text:
          "박근혜 전 대통령을 대리하는 변호사들은 부패와 권력 남용 혐의로 재판을 기다리고 있는 전 대통령에 대해 당국이 '심각한 인권 침해'를 저질렀다고 비난했습니다.",
        grammers: `복합 명사구 (Complex noun phrase):
        "Lawyers representing former South Korean president Park Geun-hye"는 복합 명사구로, 'representing former South Korean president Park Geun-hye'는 'Lawyers'를 수식하는 형용사 절입니다. 이 절은 변호사들이 어떤 인물을 대리하고 있는지를 설명합니다.
        현재분사구 (Present participle phrase):
        "representing former South Korean president Park Geun-hye"에서 'representing'은 현재분사로 사용되어 변호사들이 수행하는 동작을 나타냅니다.
        인칭 대명사 (Personal pronoun):
        "who is awaiting trial on charges of corruption and abuse of power"에서 'who'는 앞서 언급한 'Park Geun-hye'를 대체하는 인칭 대명사로 사용됩니다. 이는 복잡한 문장에서 특정 인물을 지칭할 때 유용하게 사용됩니다.
        복합 전치사구 (Complex prepositional phrase):
        "on charges of corruption and abuse of power"는 'charges'를 설명하는 전치사구로, 'corruption'과 'abuse of power'라는 두 가지 혐의에 대해 언급하고 있습니다.
        수동태 (Passive voice):
        "have accused authorities of committing"에서 'have accused'는 현재완료형의 수동태로 사용되어, 누가 무엇을 했는지보다는 어떤 행동이 일어났는지에 초점을 맞춥니다.`,
      },
    ],
  };

  const toggleSection = (index) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [index]: !prevExpandedSections[index],
    }));
  };

  const handlePress = async () => {
    const url = data.article_url;
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

  const handleLongPress = (word) => {
    if (pressTimeoutId) {
      clearTimeout(pressTimeoutId);
    }

    translateText(
      {
        token,
        text: word,
        default_language,
      },
      {
        onSuccess: (data) => {
          setTranslation(data.translation);
          const timeoutId = setTimeout(() => {
            Alert.alert("Translation", data.translation);
            setActiveWordIndex(null);
          }, 1000);
          setPressTimeoutId(timeoutId);
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
    if (pressTimeoutId) {
      clearTimeout(pressTimeoutId);
    }
  };

  useEffect(() => {
    return () => {
      if (pressTimeoutId) {
        clearTimeout(pressTimeoutId);
      }
    };
  }, [pressTimeoutId]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data.article_title,
    });
  }, [navigation]);

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
        <Image source={data.article_image} style={styles.newImage} />
        <TouchableOpacity style={styles.linkView}>
          <AppText style={styles.linkText} onPress={handlePress}>
            원문 링크로 이동
          </AppText>
        </TouchableOpacity>
        <AppText style={styles.articleTitle}>
          {data.article_title}
          <Pressable style={styles.dropDown}>
            <AntDesign name="caretdown" size={24} color="black" />
          </Pressable>
        </AppText>
        {data.article_content_sentence.map((item, index) => (
          <View key={index}>
            <View style={styles.sentence}>
              {renderTextWithPressableWords(item.origin_text, index)}
              <Pressable
                onPress={() => toggleSection(index)}
                style={styles.dropDown}
              >
                <AntDesign
                  name={expandedSections[index] ? "caretup" : "caretdown"}
                  size={18}
                  color="black"
                />
              </Pressable>
            </View>
            {expandedSections[index] && (
              <View>
                <AppText style={styles.translationText}>
                  {item.translated_text}
                </AppText>
                <AppText style={styles.grammerText}>{item.grammers}</AppText>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NewsDetailScreen;
