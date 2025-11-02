import React from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import {
  Utensils,
  TrendingUp,
  TrendingDown,
  Trash2,
} from 'lucide-react-native';

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const isUrl =
    typeof icon === 'string' &&
    (icon.startsWith('http://') || icon.startsWith('https://'));

  const getAmountStyles = () =>
    type === 'income'
      ? 'bg-green-100 text-green-600'
      : 'bg-red-100 text-red-600';

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={onDelete}
        className="bg-red-500 w-16 justify-center items-center rounded-r-lg"
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Trash2 color="#fff" size={22} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={!hideDeleteBtn ? renderRightActions : undefined}
      overshootRight={false}
    >
      <View className="flex-row items-center gap-4 mt-2 p-3 rounded-lg bg-white shadow-sm">
        <View className="w-12 h-12 bg-gray-100 rounded-full justify-center items-center">
          {icon ? (
            typeof icon === 'string' &&
            (icon.startsWith('http://') || icon.startsWith('https://')) ? (
              <Image
                source={{ uri: icon }}
                className="w-6 h-6"
                resizeMode="contain"
              />
            ) : (
              <Text className="text-2xl">{icon}</Text>
            )
          ) : (
            <Utensils color="#1f2937" size={20} />
          )}
        </View>

        <View className="flex-1 flex-row items-center justify-between">
          <View>
            <Text className="text-base text-gray-700">{title}</Text>
            <Text className="text-sm text-gray-400 mt-1">{date}</Text>
          </View>

          <View
            className={`flex-row items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <Text className={`text-sm font-medium ${getAmountStyles()}`}>
              {type === 'income' ? '+' : '-'} ₹{amount}
            </Text>
            {type === 'income' ? (
              <TrendingUp color={'#16a34a'} size={16} />
            ) : (
              <TrendingDown color={'#dc2626'} size={16} />
            )}
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default TransactionInfoCard;
