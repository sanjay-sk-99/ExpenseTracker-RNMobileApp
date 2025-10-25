import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const Header = () => {
  return (
    <View style={styles.container}>
      <Text className="text-3xl font-semibold text-black">Expense Tracker</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(12),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(12),
  },
});
