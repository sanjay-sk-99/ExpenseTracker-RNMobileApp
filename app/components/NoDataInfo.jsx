import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NoDataInfo = () => {
  return (
    <View className="flex-1 justify-center items-center py-10">
      <Text className="text-gray-400 text-base">No Transactions Found</Text>
    </View>
  );
};

export default NoDataInfo;

const styles = StyleSheet.create({});
