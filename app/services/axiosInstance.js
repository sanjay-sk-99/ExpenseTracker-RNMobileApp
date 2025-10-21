import axios from "axios";
import * as Keychain from "react-native-keychain";
import { BASE_URL } from "./endPoint";
import { Alert } from "react-native";
import { reset } from "./navigationService";
// Create a reusable axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor — attach JWT token from Keychain
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.password) {
        config.headers.Authorization = `Bearer ${credentials.password}`;
      }
    } catch (err) {
      console.warn("Keychain token retrieval failed:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        Alert.alert("Session Expired", "Please log in again.");
        // Example: redirect logic if using React Navigation
        // navigationRef.navigate("Login");
         reset('Login');
      } else if (status === 500) {
        Alert.alert("Server Error", "Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      Alert.alert("Timeout", "Request timed out. Please check your connection.");
    } else {
      Alert.alert("Network Error", "Unable to connect. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
    