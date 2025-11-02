import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import './global.css';
import RootStack from './app/navigation/RootStack';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import UserProvider from './app/context/userontext';
import Icon from 'react-native-vector-icons/MaterialIcons';
const App = () => {
  return (
    <SafeAreaProvider>
      <ToastProvider
        placement="top"
        duration={3000}
        animationType="zoom-in"
        animationDuration={300}
        offset={50}
        swipeEnabled={true}
        renderType={{
          success: toast => (
            <View style={styles.toastContainer}>
              <View
                style={[
                  styles.leftBorder,
                  { backgroundColor: 'rgb(22, 101, 52)' },
                ]}
              />
              <View style={styles.iconContainer}>
                <Icon name="check-circle" size={24} color="rgb(22, 101, 52)" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Success</Text>
                <Text style={styles.message}>{toast.message}</Text>
              </View>
              <TouchableOpacity onPress={() => toast.onHide()}>
                <Icon name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          ),
          danger: toast => (
            <View style={styles.toastContainer}>
              <View
                style={[
                  styles.leftBorder,
                  { backgroundColor: 'rgb(153, 27, 27)' },
                ]}
              />
              <View style={styles.iconContainer}>
                <Icon name="error" size={24} color="rgb(153, 27, 27)" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Error</Text>
                <Text style={styles.message}>{toast.message}</Text>
              </View>
              <TouchableOpacity onPress={() => toast.onHide()}>
                <Icon name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          ),
          info: toast => (
            <View style={styles.toastContainer}>
              <View
                style={[styles.leftBorder, { backgroundColor: '#3b82f6' }]}
              />
              <View style={styles.iconContainer}>
                <Icon name="info" size={24} color="#3b82f6" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Info</Text>
                <Text style={styles.message}>{toast.message}</Text>
              </View>
              <TouchableOpacity onPress={() => toast.onHide()}>
                <Icon name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          ),
          warning: toast => (
            <View style={styles.toastContainer}>
              <View
                style={[styles.leftBorder, { backgroundColor: 'orange' }]}
              />
              <View style={styles.iconContainer}>
                <Icon name="warning" size={24} color="orange" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Warning</Text>
                <Text style={styles.message}>{toast.message}</Text>
              </View>
              <TouchableOpacity onPress={() => toast.onHide()}>
                <Icon name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <UserProvider>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <RootStack />
        </UserProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    marginHorizontal: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 300,
  },
  leftBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width:scale(4),
    borderTopLeftRadius: moderateScale(8),
    borderBottomLeftRadius:moderateScale( 8),
  },
  iconContainer: {
    marginLeft: scale(8),
    marginRight: scale(12),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: verticalScale(2),
  },
  message: {
    fontSize: moderateScale(14),
    color: '#666',
  },
});
