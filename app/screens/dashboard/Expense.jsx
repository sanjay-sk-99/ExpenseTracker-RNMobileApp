import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import * as Keychain from 'react-native-keychain';
import { BASE_URL } from '../../services/endPoint';
import { useAxiosInterceptors } from '../../services/axiosInstance';
import { API_PATHS } from '../../services/endPoint';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/Header';
import ExpenseOverview from '../../components/expense/ExpenseOverView';
import ExpenseList from '../../components/expense/ExpenseList';
import AddExpenseForm from '../../components/expense/AddExpenseForm';
import DeleteAlert from '../../components/DeleteAlert';
import { X } from 'lucide-react-native';

const ExpenseScreen = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    icon: '',
  });
  const [updateId, setUpdateId] = useState(null);
  const toast = useToast();
  const axiosInstance = useAxiosInterceptors();

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  //Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`,
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log('something went wrong. Please try again.', error);
      toast.show('Failed to fetch income data', { type: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  //Handle Add Income
  const handleAddExpense = async expense => {
    const { category, amount, date, icon } = expense;

    //Validation Checks
    if (!category.trim()) {
      toast.show('Category is required', { type: 'warning' });
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.show('Amount must be greater than 0', { type: 'warning' });
      return;
    }

    if (!date) {
      toast.show('Date is required', { type: 'warning' });
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModel(false);
      toast.show('Expense added successfully', { type: 'success' });
      fetchExpenseDetails();
      // reset form
      setExpense({
        category: '',
        amount: '',
        date: '',
        icon: '',
      });
    } catch (error) {
      console.error(
        'error adding expense:',
        error.response?.data?.message || error.message,
      );
      toast.show('Failed to add expense', { type: 'danger' });
    }
  };

  //Delete Expense
  const deleteExpense = async id => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.show('Expense deleted successfully', { type: 'success' });
      fetchExpenseDetails();
      setDeleteId(null);
    } catch (error) {
      console.error(
        'Error deleting Expense',
        error.response?.data?.message || error.message,
      );
      toast.show('Failed to delete Expense', { type: 'danger' });
    }
  };

  const handleUpdate = expense => {
    // open modal for update with existing values
    setUpdateId(expense._id);
    setExpense({
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      icon: expense.icon,
    });
    setOpenAddExpenseModel(true);
  };
  //update income
  const updateExpense = async expense => {
    const { category, amount, date, icon } = expense;
    try {
      await axiosInstance.put(API_PATHS.EXPENSE.UPDATE_EXPENSE(updateId), {
        category,
        amount,
        date,
        icon,
      });
      fetchExpenseDetails();
      toast.show('Expense updated successfully', { type: 'success' });
      // close modal and reset update state
      setOpenAddExpenseModel(false);
      setUpdateId(null);
      setExpense({ source: '', amount: '', date: '', icon: '' });
    } catch (error) {
      console.error('Error updating Expense:', error);
      toast.show('Failed to update Expense', { type: 'danger' });
    }
  };

  // ✅ Download income
  const handleDownloadExpenseDetails = async () => {
    if (expenseData.length === 0) {
      return toast.show('No Expenses to download', { type: 'info' });
    }
    try {
      // Get your auth token from storage or state
      const token = await Keychain.getGenericPassword();

      // Public Downloads folder
      const customFolder = `${ReactNativeBlobUtil.fs.dirs.LegacyDownloadDir}/ExpenseReports`;

      const folderExists = await ReactNativeBlobUtil.fs.exists(customFolder);
      if (!folderExists) {
        await ReactNativeBlobUtil.fs.mkdir(customFolder);
      }

      const timestamp = new Date().getTime();
      const filePath = `${customFolder}/expense_details_${timestamp}.xlsx`;

      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: filePath,
        addAndroidDownloads: {
          // useDownloadManager: true,
          notification: true,
          mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          description: 'Downloading expense details',
          title: `expense_details_${timestamp}.xlsx`,
        },
      }).fetch('GET', `${BASE_URL}${API_PATHS.EXPENSE.DOWNLOAD_EXPENSE}`, {
        Authorization: `Bearer ${token.password}`,
      });

      toast.show('File downloaded successfully', { type: 'success' });
      console.log('File saved at:', response.path());
    } catch (error) {
      console.error('Error downloading income details', error);
      toast.show('Failed to download income details', { type: 'danger' });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header />
      <ScrollView className="px-4">
        {/* Expense Overview */}
        <ExpenseOverview
          transactions={expenseData}
          onAddExpense={() => {
            setUpdateId(null);
            setExpense({ category: '', amount: '', date: '', icon: '' });
            setOpenAddExpenseModel(true);
          }}
          isLoading={isLoading}
        />

        {/* Expense List */}
        <ExpenseList
          transactions={expenseData}
          onDelete={id => setDeleteId(id)}
          onDownload={handleDownloadExpenseDetails}
          onHandleUpdate={handleUpdate}
          isLoading={isLoading}
        />
      </ScrollView>

      {/* Add Expense Modal */}
      <Modal
        visible={openAddExpenseModel}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setOpenAddExpenseModel(false);
          setUpdateId(null); // clear update state when modal closed
          setExpense({ category: '', amount: '', date: '', icon: '' });
        }}
      >
        <View className="flex-1 justify-center bg-black/50">
          <View className="flex bg-white mx-5 rounded-2xl p-5">
            <View className="flex-row justify-between rounded-2xl mb-2">
              <Text className="text-lg font-semibold mb-3 text-gray-800">
                Add Expense
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setOpenAddExpenseModel(false);
                  setUpdateId(null); // clear update state when modal closed
                  setExpense({ category: '', amount: '', date: '', icon: '' });
                }}
                className="p-1"
              >
                <X size={24} color="#4B5563" />
              </TouchableOpacity>
            </View>

            <AddExpenseForm
              onAddExpense={handleAddExpense}
              onUpdateExpense={updateExpense}
              updateId={updateId}
              expense={expense}
              setExpense={setExpense}
            />
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={!!deleteId} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-6 w-4/5">
            <DeleteAlert
              content="Are you sure you want to delete this expense?"
              onDelete={() => deleteExpense(deleteId)}
              onClose={() => setDeleteId(null)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExpenseScreen;
