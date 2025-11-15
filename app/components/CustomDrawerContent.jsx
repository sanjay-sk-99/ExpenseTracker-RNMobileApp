import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { verticalScale } from 'react-native-size-matters';
import { scale } from 'react-native-size-matters';
import { UserContext } from '../context/userontext';
import { SIDE_MENU_DATA } from '../utils/sideMenuData';
import CharAvatar from '../components/cards/CharAvatar';
import Header from './Header';

export default function CustomDrawerContent({ navigation, state }) {
  const { user } = useContext(UserContext);

  return (
    <>
    <Header showDrawer={false} bgcolor={'#f1f3f4'} />
    <DrawerContentScrollView
      contentContainerStyle={{ flex: 1,paddingTop:verticalScale(10), backgroundColor: '#f1f3f4' }}
    >
      {/* Profile Section */}
      <View className="items-center justify-center mb-5">
        {user?.profileImageUrl ? (
          <Image
            source={{ uri: user.profileImageUrl }}
            className="rounded-full bg-slate-400"
            style={{ width: scale(110), height: scale(110) }}
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width={scale(110)}
            height={scale(110)}
            style="text-xl"
          />
        )}
        <Text className="text-gray-900 font-medium text-xl mt-2">
          {user?.fullName || ''}
        </Text>
      </View>

      {/* Menu Section */}
      <ScrollView className="flex-1 pl-3 pr-8">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = state.routeNames[state.index] === item.label;
          return (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center gap-3 py-4 px-5 rounded-lg mb-3 ${
                isActive ? 'bg-[#875cf5]' : 'bg-transparent'
              }`}
              onPress={() => navigation.navigate(item.path)}
            >
              {item.icon && (
                <item.icon size={24} color={isActive ? '#fff' : '#333'} />
              )}
              <Text
                className={`text-xl pl-2 ${
                  isActive ? 'text-white' : 'text-gray-800'
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </DrawerContentScrollView>
    </>
    
  );
}
