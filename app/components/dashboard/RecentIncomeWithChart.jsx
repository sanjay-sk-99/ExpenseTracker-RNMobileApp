import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4F39F6'];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map(item => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  return (
    <View className="bg-white mt-6 p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <View className="flex">
        <Text className="text-lg font-semibold text-gray-800">
          Last 60 Days Income
        </Text>
      </View>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </View>
  );
};

export default RecentIncomeWithChart;
