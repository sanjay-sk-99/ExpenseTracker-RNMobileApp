import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform, // added
} from 'react-native';
import moment from "moment";
import EmojiPickerPopup from '../EmojiPickerPopup';
import CustomTextInput from '../auth/CustomTextInput';
import { colors } from '../../config/colors';
const AddIncomeForm = ({
  onAddIncome,
  onUpdateIncome, 
  updateId,
  income,
  setIncome,
}) => {

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100} // adjust if header overlaps
    >
      {/* Emoji Picker */}
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={selectedIcon => handleChange('icon', selectedIcon)}
      />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Income Source */}
        <CustomTextInput
          label="Income Source"
          style={{ fontColor: '#1d293d' }}
          value={income.source}
          onChangeText={text => handleChange('source', text)}
          placeholder="Freelancing, Salary, etc"
          keyboardType="default"
        />

        {/* Amount */}
        <CustomTextInput
          label="Amount"
          style={{ fontColor: '#1d293d' }}
          value={String(income.amount)}
          onChangeText={text => handleChange('amount', text)}
          placeholder="Enter amount"
          keyboardType="numeric"
        />

        {/* Date */}
        <CustomTextInput
          label="Date"
          type="date"
          style={{ fontColor: '#1d293d' }}
          value={income?.date ? moment(income.date).format("YYYY-MM-DD") : ""}
          onChangeText={text => handleChange('date', text)}
          placeholder="YYYY-MM-DD"
        />

        {/* Add Income Button */}
        <View className="flex-row justify-end mt-6">
          {updateId ? (
            <TouchableOpacity
              className=" flex items-center gap-1.5 text-xs font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 "
              style={{ backgroundColor: colors.primery }}
              onPress={() => onUpdateIncome(income)} // call correct prop
            >
              <Text className="text-white font-semibold text-sm text-center">
                Update Income
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className=" flex items-center gap-1.5 text-xs font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 "
              style={{ backgroundColor: colors.primery }}
              onPress={() => onAddIncome(income)}
            >
              <Text className="text-white font-semibold text-sm text-center">
                Add Income
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddIncomeForm;
