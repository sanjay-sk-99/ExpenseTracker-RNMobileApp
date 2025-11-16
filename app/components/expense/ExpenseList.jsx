import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Download } from 'lucide-react-native';
import Loader from '../Loader';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import NoDataInfo from '../NoDataInfo';

const ExpenseList = ({
  onDelete,
  onDownload,
  transactions,
  onHandleUpdate,
  isLoading,
}) => {
  const openedRow = useRef(null);
  return (
    <View className="bg-white rounded-2xl p-4 shadow-md mt-3 mb-10 mx-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-900">All Expense</Text>

        <TouchableOpacity
          className="flex-row items-center gap-3 text-[12px] text-purple-500 bg-purple-50 px-4 py-1.5 rounded-lg border  border-gray-200/50"
          onPress={onDownload}
        >
          <Download size={18} color="#9333ea" className="mr-1" />
          <Text className=" font-semibold text-base text-purple-600">
            Download
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {isLoading ? (
        <Loader />
      ) : transactions.length > 0 ? (
        <View className="flex flex-wrap flex-row justify-between">
          {transactions.map(expense => (
            <View key={expense._id} className="w-full md:w-[48%] mb-3">
              <TransactionInfoCard
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format('DD MMM YYYY')}
                amount={expense.amount}
                type="expense"
                onDelete={() => onDelete(expense._id)}
                onHandleUpdate={() => onHandleUpdate(expense)}
                onSwipeableWillOpen={swipeableRef => {
                  if (openedRow.current && openedRow.current !== swipeableRef) {
                    openedRow.current.close();
                  }
                  openedRow.current = swipeableRef;
                }}
              />
            </View>
          ))}
        </View>
      ) : (
        <NoDataInfo />
      )}
    </View>
  );
};

export default ExpenseList;
