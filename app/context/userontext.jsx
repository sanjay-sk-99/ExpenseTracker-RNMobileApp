import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const updateUser = userData => {
    setUser(userData);
  };

  //function to clear user data (eg.,logout)
  const clearUser = () => {
    setUser(null);
    setUserLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        userLoggedIn,
        setUserLoggedIn,
        dashboardData,
        setDashboardData,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
