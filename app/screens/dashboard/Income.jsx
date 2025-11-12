import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import * as Keychain from 'react-native-keychain';
import { BASE_URL } from '../../services/endPoint';
import { useAxiosInterceptors } from '../../services/axiosInstance';
import { API_PATHS } from '../../services/endPoint';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/Header';
import IncomeOverview from '../../components/income/IncomeOverview';
import IncomeList from '../../components/income/IncomeList';
import AddIncomeForm from '../../components/income/AddIncomeForm';
import DeleteAlert from '../../components/DeleteAlert';
import { X } from 'lucide-react-native';

const IncomeScreen = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    icon: '',
  });
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const toast = useToast();
  const axiosInstance = useAxiosInterceptors();

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  // ✅ Fetch all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error('Error fetching income data:', error);
      toast.show('Failed to fetch income data', { type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add income handler
  const handleAddIncome = async income => {
    const { source, amount, date, icon } = income;

    if (!source.trim())
      return toast.show('Source is required', { type: 'warning' });
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.show('Amount must be greater than 0', { type: 'warning' });
    if (!date) return toast.show('Date is required', { type: 'warning' });

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.show('Income added successfully', { type: 'success' });
      fetchIncomeDetails();
      // reset form
      setIncome({ source: '', amount: '', date: '', icon: '' });
    } catch (error) {
      console.error('Error adding income:', error);
      toast.show('Failed to add income', { type: 'danger' });
    }
  };

  // ✅ Delete income handler
  const deleteIncome = async id => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      toast.show('Income deleted successfully', { type: 'success' });
      fetchIncomeDetails();
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting income:', error);
      toast.show('Failed to delete income', { type: 'danger' });
    }
  };

  const handleUpdate = income => {
    // open modal for update with existing values
    setUpdateId(income._id);
    setIncome({
      source: income.source,
      amount: income.amount,
      date: income.date,
      icon: income.icon,
    });
    setOpenAddIncomeModal(true);
  };
  //update income
  const updateIncome = async income => {
    const { source, amount, date, icon } = income;
    try {
      await axiosInstance.put(API_PATHS.INCOME.UPDATE_INCOME(updateId), {
        source,
        amount,
        date,
        icon,
      });
      fetchIncomeDetails();
      toast.show('Income updated successfully', { type: 'success' });
      // close modal and reset update state
      setOpenAddIncomeModal(false);
      setUpdateId(null);
      setIncome({ source: '', amount: '', date: '', icon: '' });
    } catch (error) {
      console.error('Error updating income:', error);
      toast.show('Failed to update income', { type: 'danger' });
    }
  };

  // ✅ Download income
  const handleDownloadIncomeDetails = async () => {
    if (incomeData.length === 0) {
      return toast.show('No Incomes to download', { type: 'info' });
    }
    try {
      // Get your auth token from storage or state
      const token = await Keychain.getGenericPassword();

      // Public Downloads folder
      const customFolder = `${ReactNativeBlobUtil.fs.dirs.LegacyDownloadDir}/IncomeReports`;

      const folderExists = await ReactNativeBlobUtil.fs.exists(customFolder);
      if (!folderExists) {
        await ReactNativeBlobUtil.fs.mkdir(customFolder);
      }

      const timestamp = new Date().getTime();
      const filePath = `${customFolder}/income_details_${timestamp}.xlsx`;

      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: filePath,
        addAndroidDownloads: {
          // useDownloadManager: true,
          notification: true,
          mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          description: 'Downloading income details',
          title: `income_details_${timestamp}.xlsx`,
        },
      }).fetch('GET', `${BASE_URL}${API_PATHS.INCOME.DOWNLOAD_INCOME}`, {
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
        {/* Income Overview */}
        <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => {
            // clear update state when opening add modal
            setUpdateId(null);
            setIncome({ source: '', amount: '', date: '', icon: '' });
            setOpenAddIncomeModal(true);
          }}
        />

        {/* Income List */}
        <IncomeList
          transactions={incomeData}
          onDelete={id => setDeleteId(id)}
          onDownload={handleDownloadIncomeDetails}
          onHandleUpdate={handleUpdate}
        />
      </ScrollView>

      {/* Add Income Modal */}
      <Modal
        visible={openAddIncomeModal}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setOpenAddIncomeModal(false);
          setUpdateId(null); // clear update state when modal closed
          setIncome({ source: '', amount: '', date: '', icon: '' });
        }}
      >
        <View className="flex-1 justify-center bg-black/50">
          <View className="flex bg-white mx-5 rounded-2xl p-5">
            <View className="flex-row justify-between rounded-2xl mb-2">
              <Text className="text-lg font-semibold mb-3 text-gray-800">
                {updateId ? 'Update Income' : 'Add Income'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setOpenAddIncomeModal(false);
                  setUpdateId(null);
                  setIncome({ source: '', amount: '', date: '', icon: '' });
                }}
                className="p-1"
              >
                <X size={24} color="#4B5563" />
              </TouchableOpacity>
            </View>

            <AddIncomeForm
              onAddIncome={handleAddIncome}
              onUpdateIncome={updateIncome}
              updateId={updateId}
              income={income}
              setIncome={setIncome}
            />
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={!!deleteId} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-6 w-4/5">
            <DeleteAlert
              content="Are you sure you want to delete this income?"
              onDelete={() => deleteIncome(deleteId)}
              onClose={() => setDeleteId(null)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default IncomeScreen;
