import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors } from '../config/colors';
const CustomAuthButton = ({handleAuth,navigation,text}) => {
  return (
    <View>
      <TouchableOpacity onPress={handleAuth} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>{text}</Text>
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
