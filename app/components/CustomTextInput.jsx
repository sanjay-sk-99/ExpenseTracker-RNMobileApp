import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
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
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry && !showPassword}
          style={[styles.input, inputStyle]}
          {...props}
        />
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
    top: moderateScale(22),
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
});

export default CustomTextInput;
