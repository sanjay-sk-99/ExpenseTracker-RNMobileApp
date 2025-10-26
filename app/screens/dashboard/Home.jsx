import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { addThousandsSeparator } from '../../utils/helper';
import { useAxiosInterceptors } from '../../services/axiosInstance';
import { UserContext } from '../../context/userontext';
import { API_PATHS } from '../../services/endPoint';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import InfoCard from '../../components/cards/InfoCard';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import ExpenseTransactions from '../../components/dashboard/ExpenseTransactions';
import FinancialOverview from '../../components/dashboard/FinancialOverview';
import Last30DaysExpense from '../../components/dashboard/Last30DaysExpense';
import RecentIncomeWithChart from '../../components/dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/dashboard/RecentIncome';
import Feather from 'react-native-vector-icons/Feather';
import { HandCoins, WalletMinimal } from 'lucide-react-native';
const Home = () => {
  // const [dashboardData, setDashboardData] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { dashboardData, setDashboardData, loading, setLoading } =
    useContext(UserContext);
  const axiosInstance = useAxiosInterceptors();

  const fetchData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`,
      );
      console.log(response.data);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log('Something went wrong, Please try again', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
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

        <View className="mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => console.log('navigate')}
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
            transactions={dashboardData?.last30DaysExpense?.transactions || []}
            onSeeMore={() => console.log('navigate')}
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
            onSeeMore={() => console.log('navigate')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(20),
  },
});
