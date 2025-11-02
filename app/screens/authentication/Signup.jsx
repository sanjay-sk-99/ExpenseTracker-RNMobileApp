import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userontext';
import * as Keychain from 'react-native-keychain';
import { useToast } from 'react-native-toast-notifications';
import { useAxiosInterceptors } from '../../services/axiosInstance';
import { API_PATHS } from '../../services/endPoint';
import { validateEmail } from '../../utils/helper';
import SignupUi from './SignupUi';
import uploadImage from '../../utils/uploadImage'

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [isLoading,setIsLoading]=useState(false)
  const [error, setError] = useState(null);
  const { updateUser, setUserLoggedIn } = useContext(UserContext);
  const axiosInstance = useAxiosInterceptors();
  const toast = useToast()
  const handleSignup = async e => {
    e.preventDefault();

    let profileImageUrl = '';

    if (!fullName) {
      setError('please enter your name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');

    //Sign up api call
    try {
      setIsLoading(true)
      //upload image url if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;

      // Save JWT token securely
      await Keychain.setGenericPassword('auth', token);
      console.log('Token saved successfully to Keychain');
      toast.show("signup successfully",{type:'success'})
      updateUser(user);
      setUserLoggedIn(true);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <SignupUi
      fullName={fullName}
      setFullName={setFullName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      handleSignup={handleSignup}
      profileImage={profilePic}
      setProfileImage={setProfilePic}
      isLoading={isLoading}
    />
  );
};

export default Signup;
