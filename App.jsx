import { StyleSheet,StatusBar } from 'react-native';
import React from 'react';
import './global.css';
import RootStack from './app/navigation/RootStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserProvider from './app/context/userontext';
const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <RootStack />
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
