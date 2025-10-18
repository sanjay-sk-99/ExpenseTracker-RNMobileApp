import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/dashboard/Home';
import Income from '../screens/dashboard/Income';
import Expense from '../screens/dashboard/Expense';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Income" component={Income} />
      <Drawer.Screen name="Expense" component={Expense} />
    </Drawer.Navigator>
  );
}
