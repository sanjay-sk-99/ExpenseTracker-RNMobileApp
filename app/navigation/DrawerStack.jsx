import React, { useEffect, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserContext } from '../context/userontext';
import * as Keychain from 'react-native-keychain';
import { useUserAuth } from '../hooks/useUserAuth';
import Home from '../screens/dashboard/Home';
import IncomeScreen from '../screens/dashboard/Income';
import ExpenseScreen from '../screens/dashboard/Expense';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useToast } from 'react-native-toast-notifications';
const Drawer = createDrawerNavigator();

function LogoutScreen() {
  const { clearUser,setDashboardData } = useContext(UserContext);
   const toast = useToast()
  useEffect(() => {
    const logout = async () => {
      try {
        await Keychain.resetGenericPassword();
        console.log('Token cleared from Keychain');
        toast.show( 'You have been logged out successfully.',{type:'success'});
        clearUser();
        setDashboardData(null);
      } catch (error) {
        console.error('Logout failed:', error);
        toast.show('Something went wrong while logging out.',{type:'danger'});
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
        drawerStyle: {
          width: scale(270),
          marginTop: verticalScale(60),
        },
        headerShown: false,
        drawerPosition: 'left',
        drawerType: 'front',
        overlayColor: 'transparent',
      }}
      
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Home} />
      <Drawer.Screen name="Income" component={IncomeScreen} />
      <Drawer.Screen name="Expense" component={ExpenseScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}
