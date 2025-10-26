import React from 'react'
import {View,Text} from 'react-native'
import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ['#875CF5','#FA2C37','#FF6900'];

const FinancialOverview = ({totalBalance,totalIncome,totalExpense}) => {
    const balanceData = [
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Expense",amount:totalExpense},
        {name:"Total Income",amount:totalIncome}
    ]
  return (
    <View className='bg-white mt-6 p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
      <View className="flex">
        <Text className='text-lg font-semibold text-gray-800'>Financial Overview</Text>
      </View>

      <CustomPieChart
      data={balanceData}
      label="Total Balance"
      totalAmount = {`₹${totalBalance}`}
      colors={COLORS}
      />
    </View>
  )
}

export default FinancialOverview
