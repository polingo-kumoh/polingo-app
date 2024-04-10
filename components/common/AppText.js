import * as Font from "expo-font";
import { Text } from "react-native";

// 폰트 로드 함수
export async function loadFonts() {
  await Font.loadAsync({
    "Noto-Sans": require("../../assets/fonts/NotoSansKR-VariableFont_wght.ttf"),
    "Noto-Sans-Semi-Bold": require("../../assets/fonts/NotoSansKR-SemiBold.ttf"),
    "Noto-Sans-Bold": require("../../assets/fonts/NotoSansKR-Bold.ttf"),
  });
}

const AppText = ({ children, style, ...rest }) => {
  let fontFamily = "Noto-Sans";
  let fontWeightOverride = "normal";

  if (style) {
    // 스타일 객체가 배열인 경우와 객체인 경우 모두 처리
    const flattenedStyle = Array.isArray(style)
      ? Object.assign({}, ...style)
      : style;

    // fontWeight 값에 따라 fontFamily와 fontWeightOverride 설정
    switch (flattenedStyle.fontWeight) {
      case "bold":
        fontFamily = "Noto-Sans-Bold";
        fontWeightOverride = "normal";
        break;
      case "600": // Semi-Bold 일반적으로 600 또는 'semi-bold'로 표시됩니다.
      case "semi-bold":
        fontFamily = "Noto-Sans-Semi-Bold";
        fontWeightOverride = "normal";
        break;
      // 추가로 다른 폰트 두께를 처리할 수도 있습니다.
    }
  }

  return (
    <Text
      style={[{ fontFamily, fontWeight: fontWeightOverride }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default AppText;
