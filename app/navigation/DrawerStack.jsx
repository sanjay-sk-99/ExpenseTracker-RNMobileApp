import React, { useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserContext } from '../context/userontext';
import * as Keychain from 'react-native-keychain';
import Home from '../screens/dashboard/Home';
import Income from '../screens/dashboard/Income';
import Expense from '../screens/dashboard/Expense';

const Drawer = createDrawerNavigator();

function LogoutScreen() {
  const { updateUser, setUserLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const logout = async () => {
      try {
        await Keychain.resetGenericPassword();
        console.log('Token cleared from Keychain');
        Alert.alert('Logged Out', 'You have been successfully logged out.');
        updateUser(null);
        setUserLoggedIn(false);
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
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Income" component={Income} />
      <Drawer.Screen name="Expense" component={Expense} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}
