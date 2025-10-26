import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
const CustomBarChart = ({ data = [] }) => {
  
  // Alternating bar colors
  const getBarColor = index => {
    return index % 2 === 0 ? '#875cf5' : '#cfbefb';
  };

  // Prepare chart data for gifted-charts
  const chartData = data.map((item, index) => ({
    value: Number(item.amount) || 0,
    label: item.category || '',
    frontColor: getBarColor(index),
  }));

  // Handle empty data
  if (chartData.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-10">
        <Text className="text-gray-500 text-base">No Data Available</Text>
      </View>
    );
  }

  return (
    <View className=" p-4  mt-4">
      <BarChart
        data={chartData}
        barWidth={moderateScale(22)}
        spacing={moderateScale(25)}
        height={verticalScale(200)}
        roundedTop
        hideRules
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{ color: '#555', fontSize: moderateScale(12) }}
        yAxisTextStyle={{ color: '#555', fontSize: moderateScale(12) }}
        noOfSections={5}
        yAxisLabelTexts={['0', '4000', '8000', '12000', '16000', '20000']}
        renderTooltip={item => {
          // Clamp the tooltip horizontally within chart bounds
          const tooltipWidth = 90;
          const screenPadding = 20;
          const maxX =
            item.x + tooltipWidth / 2 > 350 ? 350 - tooltipWidth / 2 : item.x;
          const posX = Math.max(screenPadding, maxX);

          // Shift vertically if bar is tall
          const posY = item.y < 80 ? item.y + 50 : item.y - 40;
          return (
            <View
              style={{
                position: 'absolute',
                left: posX - tooltipWidth / 2,
                top: posY - 80,
                backgroundColor: '#fff',
                borderColor: '#d1d5db',
                borderWidth: 1,
                borderRadius: 8,
                padding: 6,
                width: tooltipWidth,
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 3,
              }}
            >
              <Text className="text-xs font-semibold text-purple-800 text-center">
                {item.label}
              </Text>
              <Text className="text-sm text-gray-600 text-center mt-1">
                ₹{item.value}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CustomBarChart;
