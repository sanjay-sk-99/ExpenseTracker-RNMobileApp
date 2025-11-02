import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Plus } from 'lucide-react-native';
import CustomLineChart from '../charts/CustomLineChart'
import { prepareExpenseLineChartData } from '../../utils/helper';

const ExpenseOverview = ({ transactions,  onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <View className="bg-white rounded-2xl p-4 shadow-md mx-4">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-900">
           Expense Overview
          </Text>
          <Text className="text-sm  text-gray-400 mt-1">
            Track your spending trends over time and gain insights into where your money goes.
          </Text>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center gap-1.5  text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-2 py-2 "
          onPress={onAddExpense}
        >
          <Plus color='#9333ea'/>
          <Text className="flex justify-center font-semibold text-lg text-purple-600">Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Chart */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-6"
      >
        {/* <CustomBarChart data={chartData} /> */}
        <CustomLineChart data={chartData}/>
      </ScrollView>
    </View>
  );
};

export default ExpenseOverview;
