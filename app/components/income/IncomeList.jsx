import React, { lazy, Suspense, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Download } from 'lucide-react-native';
import Loader from '../Loader';
const TransactionInfoCard = lazy(() => import('../cards/TransactionInfoCard'));
const NoDataInfo = lazy(() => import('../NoDataInfo'));

const IncomeList = ({ onDelete, onDownload, transactions, onHandleUpdate }) => {
  const openedRow = useRef(null);
  return (
    <View className="bg-white rounded-2xl p-4 shadow-md mt-3 mb-10 mx-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-900">
          Income Sources
        </Text>

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
      <Suspense fallback={<Loader />}>
        {transactions.length > 0 ? (
          <View className="flex flex-wrap flex-row justify-between">
            {transactions.map(income => (
              <View key={income._id} className="w-full md:w-[48%] mb-3">
                <TransactionInfoCard
                  title={income.source}
                  icon={income.icon}
                  date={moment(income.date).format('DD MMM YYYY')}
                  amount={income.amount}
                  type="income"
                  onDelete={() => onDelete(income._id)}
                  onHandleUpdate={() => onHandleUpdate(income)}
                  onSwipeableWillOpen={swipeableRef => {
                    if (
                      openedRow.current &&
                      openedRow.current !== swipeableRef
                    ) {
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
      </Suspense>
    </View>
  );
};

export default IncomeList;
