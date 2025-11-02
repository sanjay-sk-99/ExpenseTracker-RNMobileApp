import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EmojiModal from 'react-native-emoji-modal';
import { scale } from 'react-native-size-matters';
const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = emojiObj => {
    onSelect(emojiObj);
    setIsOpen(false);
  };

  return (
    <View className="mb-4">
      {/* Icon + Label */}
      <TouchableOpacity
        className="flex flex-row items-center gap-4"
        onPress={() => setIsOpen(prev => !prev)}
        activeOpacity={0.8}
      >
        <View
          className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center"
          style={{ marginHorizontal: scale(16) }}
        >
          {icon ? (
            <Text className="text-3xl">{icon}</Text>
          ) : (
            <MaterialCommunityIcons
              name="emoticon-outline"
              size={28}
              color="#6D28D9"
            />
          )}
        </View>
        <Text className="text-gray-600 text-base">
          {icon ? 'Change Icon' : 'Pick Icon'}
        </Text>
      </TouchableOpacity>

      {/* Emoji Picker Dropdown */}
      {isOpen && (
        <>
          {/* Tap outside to close */}
          <Pressable
            onPress={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'transparent',
            }}
          />

          {/* Picker positioned below the icon */}
          <View
            style={{
              position: 'absolute',
              top: 60,
              left: 0,
              right: 0,
              zIndex: 100,
              backgroundColor: '#fff',
              borderRadius: 12,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <EmojiModal
              onEmojiSelected={handleSelect}
              open={true}
              onClose={() => setIsOpen(false)}
              backgroundStyle={{
                backgroundColor: '#fff',
                borderColor: '#fff',
                borderRadius: 10,
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default EmojiPickerPopup;
