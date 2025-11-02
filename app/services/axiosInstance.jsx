import React, { useContext } from 'react';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { BASE_URL } from './endPoint';
import { Alert } from 'react-native';
import { UserContext } from '../context/userontext';

// Custom hook to attach interceptors
export const useAxiosInterceptors = () => {
  const { clearUser } = useContext(UserContext);

  // Create axios instance
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // Request interceptor — attach JWT token from Keychain
  axiosInstance.interceptors.request.use(
    async config => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.password) {
          config.headers.Authorization = `Bearer ${credentials.password}`;
        }
      } catch (err) {
        console.warn('Keychain token retrieval failed:', err);
      }
      return config;
    },
    error => Promise.reject(error),
  );

  // Response interceptor — handle global errors
  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          Alert.alert(
            'Invalid Credentials',
            'Please check your username or password.',
          );
        } else if (status === 401) {
          // Token expired or invalid
          Alert.alert('Session Expired', 'Please log in again.');

          // Clear saved credentials
          await Keychain.resetGenericPassword();

          // Clear user from context → triggers conditional root rendering
          clearUser();
        } else if (status === 500) {
          Alert.alert('Server Error', 'Please try again later.');
        }
      } else if (error.code === 'ECONNABORTED') {
        Alert.alert(
          'Timeout',
          'Request timed out. Please check your connection.',
        );
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
