import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { QueryClientProvider } from "react-query";
import { queryClient } from "./config/queryClient";
import { AuthProvider, useAuth } from "./config/AuthContext";
import { loadFonts } from "./components/common/AppText";
import AuthNavigator from "./navigation/AuthNavigator";
import MainNavigator from "./navigation/MainNavigator";
import AppLoading from "./screen/AppLoading/AppLoading";

const AppContent = () => {
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) {
    return <AppLoading />;
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false); // 폰트 로딩 상태를 추적하는 상태 추가

  useEffect(() => {
    async function prepare() {
      await loadFonts(); // 폰트 로딩
      setFontsLoaded(true); // 폰트 로딩이 완료되면 상태 업데이트
    }

    prepare().catch((err) =>
      console.log("An error occurred while loading fonts:", err)
    );
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />; // 폰트가 로드되기 전에는 AppLoading 컴포넌트를 표시
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
