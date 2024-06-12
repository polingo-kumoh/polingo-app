import "dotenv/config";

export default {
  expo: {
    name: "Polingo-Frontend",
    slug: "Polingo-Frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.sixmuscle.PolingoFrontend",
      config: {
        googleSignIn: {
          reservedClientId: process.env.GOOGLE_CLIENT_ID_IOS,
        },
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.sixmuscle.PolingoFrontend",
      config: {
        googleSignIn: {
          apiKey: process.env.GOOGLE_CLIENT_ID_ANDROID,
        },
      },
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-font"],
    extra: {
      eas: {
        projectId: "c92db6b1-fc41-4e94-ba9d-3d2bb065f3a6",
      },
      googleClientIdWeb: process.env.GOOGLE_CLIENT_ID_WEB,
      googleClientIdAndroid: process.env.GOOGLE_CLIENT_ID_ANDROID,
      googleClientIdIos: process.env.GOOGLE_CLIENT_ID_IOS,
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
    },
    scheme: "polingo",
  },
};
