import React from 'react';
import {useLocation} from 'react-router-dom';

const authServerAuthUrl = `${process.env.REACT_APP_AUTH_URL}`

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({children}) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  if (location.pathname !== '/auth' && location.pathname !== '/error' && !token) {
    window.location.href = authServerAuthUrl;
    return <></>;
  } else {
    return <>{children}</>;
  }
};

export default AuthCheck;
