import React, { useState, useEffect, useRef } from "react";
import { Text } from "react-native";

const DynamicText = ({ children, style }) => {
  const [fontSize, setFontSize] = useState(style.fontSize || 16);
  const textRef = useRef(null);

  const adjustFontSize = (height) => {
    const lineHeight = style.lineHeight || fontSize * 1.2;
    const maxHeight = lineHeight * 2; // 두 줄을 기준으로 높이 계산

    if (height > maxHeight && fontSize > 10) {
      setFontSize((prevFontSize) => prevFontSize - 0.1);
    }
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.measure((x, y, width, height) => {
        adjustFontSize(height);
      });
    }
  }, []);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.measure((x, y, width, height) => {
        adjustFontSize(height);
      });
    }
  }, [fontSize]);

  return (
    <Text
      ref={textRef}
      style={[style, { fontSize }]}
      onLayout={(event) => adjustFontSize(event.nativeEvent.layout.height)}
    >
      {children}
    </Text>
  );
};

export default DynamicText;
