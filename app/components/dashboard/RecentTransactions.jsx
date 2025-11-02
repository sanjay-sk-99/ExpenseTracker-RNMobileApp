import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import moment from 'moment';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import { UserContext } from '../../context/userontext';
import Loader from '../Loader';
import NoDataInfo from '../NoDataInfo';

const RecentTransactions = ({ transactions, onSeeMore }) => {
  const { loading } = useContext(UserContext);
  return (
    <View className="bg-white rounded-lg p-4 shadow-md">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-gray-800">
          Recent Transactions
        </Text>

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
          {transactions?.slice(0, 5)?.map(item => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === 'expense' ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format('DD MMM YYYY')}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn={true}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default RecentTransactions;
