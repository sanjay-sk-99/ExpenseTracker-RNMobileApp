import React, { useState, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import NoDataInfo from '../NoDataInfo';

const CustomPieChart = ({
  data = [],
  label = 'Total Balance',
  totalAmount = 0,
  colors = ['#22C55E', '#3B82F6', '#F97316', '#EF4444'],
}) => {
  const [selectedSlice, setSelectedSlice] = useState(null);
  const [lastTouchPos, setLastTouchPos] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: '',
    value: 0,
  });
  const chartContainerRef = useRef(null);

  // Capture touch position whenever user touches the container
  const handleTouchStart = e => {
    const touch = e.nativeEvent.touches[0];
    chartContainerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const relativeX = touch.pageX - pageX;
      const relativeY = touch.pageY - pageY;
      setLastTouchPos({ x: relativeX, y: relativeY });
    });
  };

  const handleSlicePress = item => {
    setTooltip({
      visible: true,
      x: lastTouchPos.x,
      y: lastTouchPos.y,
      text: item.name,
      value: item.amount,
    });
    setSelectedSlice(item);
  };

  const handleOutsideTap = () => {
    setTooltip({ ...tooltip, visible: false });
    setSelectedSlice(null);
  };

  // Prepare chart data
  const chartData = data.map((item, index) => ({
    value: Number(item.amount) || 0,
    color: colors[index % colors.length],
    text: item.name || `Item ${index + 1}`,
    focused: tooltip.visible && tooltip.text === item.name,
    onPress: () => handleSlicePress(item),
  }));

  // Handle no data
  if (chartData.length === 0) {
    return <NoDataInfo />;
  }

  return (
    <Pressable onPress={handleOutsideTap}>
      <View
        ref={chartContainerRef}
        className="bg-white py-4"
        collapsable={false}
        onTouchStart={handleTouchStart}
      >
        <View className="items-center justify-center">
          <PieChart
            data={chartData}
            donut
            radius={moderateScale(90)}
            innerRadius={moderateScale(65)}
            showText={false}
            sectionAutoFocus={false}
            focusOnPress
            startAngle={-90}
            centerLabelComponent={() => (
              <View className="items-center justify-center">
                <Text className="text-gray-600 text-sm">{label}</Text>
                <Text className="text-gray-800 text-xl font-bold mt-1">
                  {totalAmount}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Tooltip positioned at tap location */}
        {tooltip.visible && (
          <View
            style={{
              position: 'absolute',
              left: tooltip.x - 50,
              top: tooltip.y - 60,
              backgroundColor: 'white',
              borderRadius: moderateScale(8),
              paddingVertical: verticalScale(6),
              paddingHorizontal: scale(12),
              borderWidth: moderateScale(1),
              borderColor: '#ccc',
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: moderateScale(3),
              elevation: 4,
              minWidth: scale(100),
              alignItems: 'center',
            }}
          >
            <Text className="text-xs font-semibold text-gray-700">
              {tooltip.text}
            </Text>
            <Text className="text-sm text-gray-600">₹{tooltip.value}</Text>
          </View>
        )}

        {/* Custom Legends */}
        <View className="mt-5">
          <View className="flex-row justify-evenly flex-wrap">
            {chartData.map((item, index) => (
              <View key={index} className="flex-row items-center mr-4 mb-2">
                <View
                  className="w-4 h-4 mr-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <Text className="text-gray-700 text-sm">{item.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CustomPieChart;
