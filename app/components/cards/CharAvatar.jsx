import React from 'react';
import { getInitials } from '../../utils/helper';
import { View, Text } from 'react-native';

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <View
      className={` ${
        style || ''
      } flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
      style={{ width: width, height: height }}
    >
      <Text className='text-gray-900 font-medium text-3xl'>{getInitials(fullName || '')}</Text>
    </View>
  );
};

export default CharAvatar;
