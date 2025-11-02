import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator } from 'react-native';
import React from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../config/colors';
const CustomAuthButton = ({ handleAuth, navigateText,buttonText, textQuestion ,isLoading}) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={handleAuth} style={styles.button}>
        {isLoading ? <ActivityIndicator color={colors.white}/> : <Text style={styles.buttonText}>{buttonText}</Text>}
      </TouchableOpacity>

      {/* Navigation Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>{textQuestion}</Text>
        <TouchableOpacity
          onPress={() =>
            navigateText === 'SignUp' ? navigation.navigate(navigateText) : navigation.pop()
          }
        >
          <Text style={styles.signupLink}>{navigateText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomAuthButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primery,
    paddingVertical: verticalScale(12),
    borderRadius: 12,
    marginTop: verticalScale(8),
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: moderateScale(16),
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(16),
  },
  signupText: {
    fontSize: moderateScale(13),
    color: '#4B5563',
  },
  signupLink: {
    fontSize: moderateScale(13),
    color: colors.secondary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
