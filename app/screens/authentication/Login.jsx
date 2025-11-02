import React, { useState, useContext } from 'react';
import LoginUi from './LoginUi';
import { UserContext } from '../../context/userontext';
import * as Keychain from 'react-native-keychain';
import { useToast } from 'react-native-toast-notifications';
import { useAxiosInterceptors } from '../../services/axiosInstance';
import { API_PATHS } from '../../services/endPoint';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading,setIsLoading]=useState(false)
  const { updateUser, setUserLoggedIn } = useContext(UserContext);
  const toast = useToast()
  const axiosInstance = useAxiosInterceptors();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setError('');

    try {
     setIsLoading(true)
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (!token) {
        throw new Error('Token not received from server');
      }

      // Save JWT token securely
      await Keychain.setGenericPassword('auth', token);
      toast.show("Login successfully",{type:'success'})
      console.log('Token saved successfully to Keychain');
      updateUser(user);
      setUserLoggedIn(true);
    } catch (err) {
      // console.error('Login error:', err.message);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      }
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <LoginUi
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      handleLogin={handleLogin}
      isLoading={isLoading}
    />
  );
};

export default Login;
