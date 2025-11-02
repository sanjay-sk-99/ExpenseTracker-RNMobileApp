import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { colors } from '../config/colors';
const DeleteAlert = ({ content, onDelete, onClose }) => {
  return (
    <View className="p-4">
      {/* Header: Content + Close Icon */}
      <View className="flex-row justify-between  items-center mb-3 ">
        <Text className="text-lg font-bold text-gray-700 flex-1">Delete Income</Text>

        <TouchableOpacity
          onPress={onClose}
          className="p-1"
        >
          <X size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>
       <Text className="text-sm font-semibold text-gray-700 ">{content}</Text>
      {/* Delete Button */}
      <View className="flex-row justify-end mt-6">
        <TouchableOpacity
          className=" flex items-center gap-1.5 text-xs font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 "
          style={{backgroundColor:colors.primery}}
          onPress={onDelete}
        >
          <Text className="text-white font-semibold text-sm text-center">
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteAlert;
