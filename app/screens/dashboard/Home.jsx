import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useContext,useCallback } from 'react';
import { addThousandsSeparator } from '../../utils/helper';
import { useAxiosInterceptors } from '../../services/axiosInstance';
import { UserContext } from '../../context/userontext';
import { API_PATHS } from '../../services/endPoint';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import InfoCard from '../../components/cards/InfoCard';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import ExpenseTransactions from '../../components/dashboard/ExpenseTransactions';
import FinancialOverview from '../../components/dashboard/FinancialOverview';
import Last30DaysExpense from '../../components/dashboard/Last30DaysExpense';
import RecentIncomeWithChart from '../../components/dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/dashboard/RecentIncome';
import Feather from 'react-native-vector-icons/Feather';
import { HandCoins, WalletMinimal } from 'lucide-react-native';
import Header from '../../components/Header';

const Home = () => {
  const { dashboardData, setDashboardData, loading, setLoading } =
    useContext(UserContext);
  const axiosInstance = useAxiosInterceptors();
  const navigation = useNavigation();
  const fetchData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`,
      );
      
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log('Something went wrong, Please try again', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <ScrollView className="px-4" keyboardShouldPersistTaps="handled">
        <View className="mx-4">
          <InfoCard
            icon={<Feather name="credit-card" size={26} color="#fff" />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="#875cf5"
          />
          <InfoCard
            icon={<WalletMinimal size={26} color="#fff" />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="#f97316"
          />
          <InfoCard
            icon={<HandCoins size={26} color="#fff" />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="#ef4444"
          />

          <View className="mt-6 mb-6">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() =>
                dashboardData?.recentTransactions[0].type === 'expense'
                  ? navigation.navigate('Expense')
                  : navigation.navigate('Income')
              }
            />
            <FinancialOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />
            <Last30DaysExpense
              data={dashboardData?.last30DaysExpense?.transactions || []}
            />
            <ExpenseTransactions
              transactions={
                dashboardData?.last30DaysExpense?.transactions || []
              }
              onSeeMore={() => navigation.navigate('Expense')}
            />

            <RecentIncomeWithChart
              data={
                dashboardData?.last60DaysIncome?.transactions.slice(0, 5) || []
              }
              totalIncome={dashboardData?.totalIncome || 0}
            />
            <RecentIncome
              transactions={
                dashboardData?.last60DaysIncome?.transactions.slice(0, 5) || []
              }
              onSeeMore={() => navigation.navigate('Income')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
