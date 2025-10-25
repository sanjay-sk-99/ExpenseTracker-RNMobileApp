import React, { useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserContext } from '../context/userontext';
import * as Keychain from 'react-native-keychain';
import { useUserAuth } from '../hooks/useUserAuth';
import Home from '../screens/dashboard/Home';
import Income from '../screens/dashboard/Income';
import Expense from '../screens/dashboard/Expense';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { scale, moderateScale } from 'react-native-size-matters';
const Drawer = createDrawerNavigator();

function LogoutScreen() {
  const { clearUser } = useContext(UserContext);

  useEffect(() => {
    const logout = async () => {
      try {
        await Keychain.resetGenericPassword();
        console.log('Token cleared from Keychain');
        Alert.alert('Logged Out', 'You have been successfully logged out.');
        clearUser();
      } catch (error) {
        console.error('Logout failed:', error);
        Alert.alert('Error', 'Something went wrong while logging out.');
      }
    };

    logout();
  }, []);

  return null; // No UI needed
}
export default function DrawerStack() {
  useUserAuth();

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerTitle: 'Expense Tracker',
        drawerStyle: {
          width: scale(270),
        },
        headerTitleStyle: {
          fontSize: moderateScale(23),
          fontWeight: moderateScale(600), 
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Home} />
      <Drawer.Screen name="Income" component={Income} />
      <Drawer.Screen name="Expense" component={Expense} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}
