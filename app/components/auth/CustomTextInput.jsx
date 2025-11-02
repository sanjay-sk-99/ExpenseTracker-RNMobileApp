// import React,{useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import DateTimePicker from "@react-native-community/datetimepicker";
// const CustomTextInput = ({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   keyboardType = 'default',
//   autoCapitalize = 'sentences',
//   secureTextEntry = false,
//   showPasswordToggle = false,
//   style,
//   inputStyle,
//   labelStyle,
//   iconName,
//   iconSize = 22,
//   iconColor = '#6B7280',
//   ...props
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
// const [date, setDate] = useState(new Date());
//   return (
//     <View style={[styles.container, style]}>
//       {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
//       <View style={styles.inputWrapper}>
//         <TextInput
//           value={value}
//           onChangeText={onChangeText}
//           placeholder={placeholder}
//           keyboardType={keyboardType}
//           autoCapitalize={autoCapitalize}
//           secureTextEntry={secureTextEntry && !showPassword}
//           style={[styles.input, inputStyle]}
//           {...props}
//         />
//         {showPasswordToggle && (
//           <TouchableOpacity
//             onPress={() => setShowPassword(!showPassword)}
//             style={styles.iconWrapper}
//           >
//             <MaterialCommunityIcons
//               name={showPassword ? 'eye' : 'eye-off'}
//               size={iconSize}
//               color={iconColor}
//             />
//           </TouchableOpacity>
//         )}
//         {iconName && !showPasswordToggle && (
//           <View style={styles.iconWrapper}>
//             <MaterialCommunityIcons
//               name={iconName}
//               size={iconSize}
//               color={iconColor}
//             />
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: verticalScale(4),
//   },
//   iconWrapper: {
//     position: 'absolute',
//     right: moderateScale(10),
//     top: moderateScale(24),
//     transform: [{ translateY: -11 }],
//   },
//   label: {
//     color: '#4B5563',
//     marginBottom: verticalScale(4),
//     fontWeight: '600',
//   },
//   inputWrapper: {
//     position: 'relative',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#D1D5DB',
//     borderRadius: 12,
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(12),
//     marginBottom: verticalScale(12),
//     color: '#111827',
//   },
// });

// export default CustomTextInput;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Calendar, LocaleConfig} from 'react-native-calendars';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  type = "text", // new prop for field type
  autoCapitalize = "sentences",
  secureTextEntry = false,
  showPasswordToggle = false,
  style,
  inputStyle,
  labelStyle,
  iconName,
  iconSize = 22,
  iconColor = "#6B7280",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0]; // format YYYY-MM-DD
      onChangeText(formatted);
    }
  };

  const handleInputPress = () => {
    if (type === "date") {
      setShowDatePicker(true);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TouchableOpacity
          activeOpacity={type === "date" ? 0.8 : 1}
          onPress={handleInputPress}
        >
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            editable={type !== "date"} // disable typing if date
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry && !showPassword}
            style={[styles.input, inputStyle]}
            {...props}
          />
        </TouchableOpacity>

        {/* Show/hide password */}
        {showPasswordToggle && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconWrapper}
          >
            <MaterialCommunityIcons
              name={showPassword ? "eye" : "eye-off"}
              size={iconSize}
              color={iconColor}
            />
          </TouchableOpacity>
        )}

        {/* Icon if provided */}
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

      {/* Date picker modal */}
      {showDatePicker && (
        // <DateTimePicker
        //   value={value ? new Date(value) : new Date()}
        //   mode="date"
        //   display="default"
        //   onChange={handleDateChange}
        //   themeVariant="light"
        //   textColor="purple"
        // />
            <Calendar
      onDayPress={day => {
        onChangeText(day.dateString);
      }}
      markedDates={{
        [value]: {value: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(4),
  },
  iconWrapper: {
    position: "absolute",
    right: moderateScale(10),
    top: moderateScale(24),
    transform: [{ translateY: -11 }],
  },
  label: {
    color: "#4B5563",
    marginBottom: verticalScale(4),
    fontWeight: "600",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(12),
    color: "#111827",
  },
});

export default CustomTextInput;
