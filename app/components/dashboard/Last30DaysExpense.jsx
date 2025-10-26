import React, { useState, useEffect } from 'react';
import { View,Text } from 'react-native';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../charts/CustomBarChart';

const Last30DaysExpense = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <View className="bg-white  mt-6 rounded-lg p-4 shadow-md">
      <View className="">
        <Text className="text-lg font-semibold text-gray-800">
          Last 30 Days Expenses
        </Text>
      </View>

      <CustomBarChart data={chartData} />
    </View>
  );
};

export default Last30DaysExpense;
