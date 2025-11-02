import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { scale, verticalScale,moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { Menu, X } from 'lucide-react-native';

// Try-catch approach to safely use drawer hook
const Header = ({ showDrawer = true }) => {
  const navigation = useNavigation();

  let isDrawerOpen = false;
  let hasDrawer = false;

  // Safely check if drawer exists
  try {
    const { useDrawerStatus } = require('@react-navigation/drawer');
    const drawerStatus = useDrawerStatus();
    isDrawerOpen = drawerStatus === 'open';
    hasDrawer = true;
  } catch (error) {
    hasDrawer = false;
  }

  const toggleDrawer = () => {
    if (hasDrawer) {
      navigation.toggleDrawer();
    }
  };

  // Don't show drawer button if not in drawer context or showDrawer is false
  if (!hasDrawer || !showDrawer) {
    return (
      <View style={styles.container}>
        <Text className="text-3xl font-semibold text-black">
          Expense Tracker
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer} >
        {isDrawerOpen ? (
          <Text>
            {' '}
            <X size={scale(24)} color="#000000" />{' '}
          </Text>
        ) : (
          <Text>
            <Menu size={scale(24)} color="#000000" />
          </Text>
        )}
      </TouchableOpacity>
      <Text className="text-3xl font-semibold text-black mr-[60px]">Expense Tracker</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(16),
    marginTop:verticalScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  hamburgerText: {
    fontSize: moderateScale(20),
    color: 'black',
    fontWeight: 'bold',
  },
});
