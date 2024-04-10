import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState(null);

  const login = async (userToken, username) => {
    try {
      await AsyncStorage.setItem("userToken", userToken);
      setIsAuthenticated(true);
      setToken(userToken);
    } catch (error) {
      console.log("Saving token failed", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setIsAuthenticated(false);
      setToken(null);
    } catch (error) {
      console.log("Removing token failed", error);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        setIsAuthenticated(true);
      }
      setIsReady(true);
    };

    fetchToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, isReady }}
    >
      {children}
    </AuthContext.Provider>
  );
};
