import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors } from '../../config/colors';
import CustomTextInput from '../../components/auth/CustomTextInput';
import CustomAuthbutton from '../../components/auth/CustomAuthButton';
import ProfilePhotoSelector from '../../components/auth/ProfilePhotoSelector';
const SignupUi = ({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleSignup,
  profileImage,
  setProfileImage,
}) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.imgContainer}>
            <Text className="text-2xl font-semibold text-black">
              Create an Account
            </Text>
            <Text className="text-base text-slate-700 mt-[5px] mb-6">
              Join us today by entering your details below.
            </Text>

            <ProfilePhotoSelector
              image={profileImage}
              setImage={setProfileImage}
            />
          </View>
          <View style={styles.formContainer}>
            {/* Full name */}
            <CustomTextInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="John"
            />
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
              handleAuth={handleSignup}
              buttonText={"Sign Up"}
              navigateText={'Login'}
              textQuestion={'Already have an sccount? '}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupUi;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(20),
  },
  imgContainer: {
    flex: 0.5,
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
