import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Plus } from 'lucide-react-native';
import CustomBarChart from '../charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({ transactions, onAddIncome, isLoading }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <View className="bg-white rounded-2xl p-4 shadow-md mx-4">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-900">
            Income Overview
          </Text>
          <Text className="text-sm  text-gray-400 mt-1">
            Track your earnings over time and analyze your income trends
          </Text>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center gap-1.5  text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-2 py-2 "
          onPress={onAddIncome}
        >
          <Plus color="#9333ea" />
          <Text className="flex justify-center font-semibold text-lg text-purple-600">
            Add Income
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chart */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-6"
      >
        <CustomBarChart data={chartData} isLoading={isLoading} />
      </ScrollView>
    </View>
  );
};

export default IncomeOverview;
