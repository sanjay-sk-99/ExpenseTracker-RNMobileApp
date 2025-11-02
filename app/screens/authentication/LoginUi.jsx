import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors } from '../../config/colors';
import CustomTextInput from '../../components/auth/CustomTextInput';
import CustomAuthbutton from '../../components/auth/CustomAuthButton';
const LoginUi = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleLogin,
  isLoading
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header showDrawer={false}/>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-2xl font-semibold text-black">
            Welcome Back
          </Text>
          <Text className="text-base text-slate-700 mt-[5px] mb-6">
            Please enter your details to log in.
          </Text>
          <View style={styles.imgContainer}>
            <Image
              style={{ width: moderateScale(120), height: moderateScale(120) }}
              source={require('../../../assets/Vector.png')}
            />
          </View>
          <View style={styles.formContainer}>
            {/* Email */}
            <CustomTextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="john@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password */}
            <CustomTextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Min 8 characters"
              secureTextEntry={true}
              showPasswordToggle={true}
            />
            {/* Error */}
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {/* Login Button */}
            <CustomAuthbutton
              handleAuth={handleLogin}
              navigateText={'SignUp'}
              buttonText={'Login'}
              textQuestion={'Don’t have an account? '}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginUi;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(12),
  },
  imgContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 0.5,
    width: '100%',
  },
  error: {
    color: colors.error,
    fontSize: moderateScale(12),
    marginBottom: verticalScale(8),
  },
});
