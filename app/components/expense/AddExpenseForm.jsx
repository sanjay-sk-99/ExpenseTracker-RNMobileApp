import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';
import EmojiPickerPopup from '../EmojiPickerPopup';
import CustomTextInput from '../auth/CustomTextInput';
import { colors } from '../../config/colors';

const AddExpenseForm = ({
  onAddExpense,
  onUpdateExpense,
  updateId,
  expense,
  setExpense,
}) => {
  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100} // adjust if header overlaps
    >
      {/* Emoji Picker */}
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={selectedIcon => handleChange('icon', selectedIcon)}
      />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Income Source */}
        <CustomTextInput
          label="Expense Category"
          style={{ fontColor: '#1d293d' }}
          value={expense.category}
          onChangeText={text => handleChange('category', text)}
          placeholder="Rent, Groceries, etc"
          keyboardType="default"
        />

        {/* Amount */}
        <CustomTextInput
          label="Amount"
          style={{ fontColor: '#1d293d' }}
          value={String(expense.amount)}
          onChangeText={text => handleChange('amount', text)}
          placeholder="Enter amount"
          keyboardType="numeric"
        />

        {/* Date */}
        <CustomTextInput
          label="Date"
          type="date"
          style={{ fontColor: '#1d293d' }}
          value={expense?.date ? moment(expense.date).format('YYYY-MM-DD') : ''}
          onChangeText={text => handleChange('date', text)}
          placeholder="YYYY-MM-DD"
          keyboardType="date"
        />

        {/* Add Expense Button */}
        <View className="flex-row justify-end mt-6">
          {updateId ? (
            <TouchableOpacity
              className=" flex items-center gap-1.5 text-xs font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 "
              style={{ backgroundColor: colors.primery }}
              onPress={() => onUpdateExpense(expense)} // call correct prop
            >
              <Text className="text-white font-semibold text-sm text-center">
                Update expense
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className=" flex items-center gap-1.5 text-xs font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 "
              style={{ backgroundColor: colors.primery }}
              onPress={() => onAddExpense(expense)}
            >
              <Text className="text-white font-semibold text-sm text-center">
                Add Expense
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddExpenseForm;
