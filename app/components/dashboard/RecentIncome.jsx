import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import moment from 'moment';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import { UserContext } from '../../context/userontext';
import Loader from '../Loader';
import NoDataInfo from '../NoDataInfo';
const RecentIncome = ({ transactions, onSeeMore }) => {
  const { loading } = useContext(UserContext);
  return (
    <View className="bg-white mt-6 rounded-lg p-4 shadow-md">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-gray-800">Income</Text>

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
        <NoDataInfo />
      ) : (
        <View>
          {transactions?.slice(0, 5)?.map(income => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format('DD MMM YYYY')}
              amount={income.amount}
              type="income"
              hideDeleteBtn
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default RecentIncome;
