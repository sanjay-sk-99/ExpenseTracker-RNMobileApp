import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import moment from 'moment';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import { UserContext } from '../../context/userontext';
import Loader from '../Loader';

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  const { loading } = useContext(UserContext);
  return (
    <View className="bg-white  mt-6 rounded-lg p-4 shadow-md">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-gray-800">Expenses</Text>

        <TouchableOpacity
          className="flex-row items-center gap-1"
          onPress={onSeeMore}
        >
          <Text className="text-blue-600 font-medium">See All</Text>
          <ArrowRight color={'#2563eb'} size={18} />
        </TouchableOpacity>
      </View>

      {/* Transactions List */}

      {loading ? (
        <Loader />
      ) : transactions?.length === 0 ? (
        <View className="flex-1 justify-center items-center py-10">
          <Text className="text-gray-400 text-base">No Transactions Found</Text>
        </View>
      ) : (
        <View>
          {transactions?.slice(0, 5)?.map(expense => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format('DD MMM YYYY')}
              amount={expense.amount}
              type={expense.type}
              hideDeleteBtn={true} // hide swipe delete in this list
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ExpenseTransactions;
