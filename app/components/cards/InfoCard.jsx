import React from 'react'
import { View, Text } from 'react-native'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <View className="flex-row gap-6 bg-white p-6 my-2 rounded-2xl shadow-md border border-gray-200/50">
      {/* Icon container */}
      <View className={`w-14 h-14 items-center justify-center rounded-full`} style={{backgroundColor:color}}>
       {icon}
      </View>

      {/* Text section */}
      <View>
        <Text className="text-base text-gray-500 mb-1">{label}</Text>
        <Text className="text-[20px] font-medium">₹{value}</Text>
      </View>
    </View>
  )
}

export default InfoCard
