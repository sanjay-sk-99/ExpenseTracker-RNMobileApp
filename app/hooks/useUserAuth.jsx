import { useContext, useEffect } from 'react';
import { useAxiosInterceptors } from '../services/axiosInstance';
import { UserContext } from '../context/userontext';
import { API_PATHS } from '../services/endPoint';

export const useUserAuth = () => {
  const axiosInstance = useAxiosInterceptors();
  const { user, updateUser, clearUser } = useContext(UserContext);
  7;

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        if (!user) {
          const response = await axiosInstance.get(
            API_PATHS.AUTH.GET_USER_INFO,
          );
          if (isMounted && response?.data) {
            updateUser(response.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
        if (isMounted) {
          clearUser();
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, []);
};
