import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Calendar } from 'react-native-calendars';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  type = 'text',
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  showPasswordToggle = false,
  style,
  inputStyle,
  labelStyle,
  iconName,
  iconSize = 22,
  iconColor = '#6B7280',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateSelect = (day) => {
    onChangeText(day.dateString);
    setShowDatePicker(false); 
  };

  const handleInputPress = () => {
    if (type === 'date') {
      setShowDatePicker(true);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TouchableOpacity
          activeOpacity={type === 'date' ? 0.8 : 1}
          onPress={handleInputPress}
        >
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            editable={type !== 'date'}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry && !showPassword}
            style={[styles.input, inputStyle]}
            {...props}
          />
        </TouchableOpacity>

        {showPasswordToggle && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconWrapper}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye' : 'eye-off'}
              size={iconSize}
              color={iconColor}
            />
          </TouchableOpacity>
        )}

        {iconName && !showPasswordToggle && (
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name={iconName}
              size={iconSize}
              color={iconColor}
            />
          </View>
        )}
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDatePicker(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>
            
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [value]: {
                  selected: true,
                  selectedColor: '#3B82F6',
                  disableTouchEvent: false,
                },
              }}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                selectedDayBackgroundColor: '#3B82F6',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#3B82F6',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                arrowColor: '#3B82F6',
                monthTextColor: '#2d4150',
                textDayFontWeight: '400',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '600',
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(4),
  },
  iconWrapper: {
    position: 'absolute',
    right: moderateScale(10),
    top: moderateScale(24),
    transform: [{ translateY: -11 }],
  },
  label: {
    color: '#4B5563',
    marginBottom: verticalScale(4),
    fontWeight: '600',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(12),
    color: '#111827',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    width: '90%',
    maxWidth: scale(300),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(14),
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#111827',
  },
});

export default CustomTextInput;
