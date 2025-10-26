import React, { useEffect, useState,useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {navigationRef} from '../services/navigationService'
import { UserContext } from '../context/userontext';
import AuthStack from './AuthStack';
import DrawerStack from './DrawerStack';
import * as Keychain from "react-native-keychain";
import { ActivityIndicator, View } from 'react-native';
import { Loader } from 'lucide-react-native';
export default function RootStack() {
  const [loading, setLoading] = useState(true);
  const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

useEffect(() => {
    const checkLogin = async () => {
      try {
        // Get stored token (if available)
        const credentials = await Keychain.getGenericPassword();

        if (credentials && credentials.password) {
          setUserLoggedIn(true);
        } else {
          setUserLoggedIn(false);
        }
      } catch (error) {
        console.warn("Error checking login status:", error);
        setUserLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    <Loader/>
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {userLoggedIn ? <DrawerStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
