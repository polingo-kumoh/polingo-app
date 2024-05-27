import React, { useState, useEffect, useRef } from "react";
import { Text } from "react-native";

const DynamicText = ({ children, style }) => {
  const [fontSize, setFontSize] = useState(style.fontSize || 16);
  const [isAdjusting, setIsAdjusting] = useState(true);
  const textRef = useRef(null);

  const adjustFontSize = (event) => {
    const { height } = event.nativeEvent.layout;
    const lineHeight = style.lineHeight || fontSize * 1.2;
    const maxHeight = lineHeight * 2; // 두 줄을 기준으로 높이 계산

    if (height > maxHeight && fontSize > 10) {
      setFontSize((prevFontSize) => prevFontSize - 1);
      setIsAdjusting(true); // 다시 측정하도록 설정
    } else {
      setIsAdjusting(false); // 조정 완료
    }
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.measure((x, y, width, height) => {
        adjustFontSize({ nativeEvent: { layout: { height } } });
      });
    }
  }, [fontSize]);

  return (
    <Text
      ref={textRef}
      style={[style, { fontSize }]}
      onLayout={isAdjusting ? adjustFontSize : undefined}
    >
      {children}
    </Text>
  );
};

export default DynamicText;
