import React from 'react';
import { View, Text } from 'react-native';
import NoDataInfo from '../NoDataInfo';
import Loader from '../Loader';
import { LineChart } from 'react-native-gifted-charts';

const CustomLineChart = ({ data, isLoading }) => {
  // Convert your web data [{ month, amount }] to GiftedCharts format
  const chartData = data.map(item => ({
    value: item.amount,
    label: item.month,
    category: item.category,
  }));

  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm">
      {isLoading ? (
        <Loader />
      ) : chartData.length > 0 ? (
        <LineChart
          data={chartData}
          color={'#B75CF5'}
          thickness={2}
          curved
          hideRules
          yAxisColor="transparent"
          xAxisColor="transparent"
          hideYAxisText={false}
          hideDataPoints={false}
          dataPointsColor="#B75CF5"
          yAxisTextStyle={{ color: '#6B7280', fontSize: 10 }}
          xAxisLabelTextStyle={{ color: '#6B7280', fontSize: 10 }}
          noOfSections={5}
          spacing={50}
          areaChart={true}
          startFillColor={'#B75CF5'}
          endFillColor={'#B75CF5'}
          startOpacity={0.4}
          endOpacity={0.05}
          focusEnabled
          showScrollIndicator={false}
          showVerticalLines={false}
          showYAxisIndices={false}
          width={340}
          height={220}
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: '#B75CF5',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: false,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: items => {
              const item = items[0];
              return (
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#7C3AED',
                    }}
                  >
                    {item.category || item.label}
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: '#374151', marginTop: 4 }}
                  >
                    Amount: ₹{item.value}
                  </Text>
                </View>
              );
            },
          }}
        />
      ) : (
        <NoDataInfo />
      )}
    </View>
  );
};

export default CustomLineChart;
