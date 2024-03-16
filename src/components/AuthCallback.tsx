import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const redirectUrl = `${process.env.REACT_APP_AUTH_REDIRECT_URL}`
        const getTokenUrl = `${process.env.REACT_APP_TOKEN_URL}`

        if (code) {
          // Call the auth server's token API with the code
          const tokenResponse = await axios.get(
            getTokenUrl,
            {
              params: {
                redirectUrl,
                code,
              },
            }
          );

          // Handle the token response
          const {access_token} = tokenResponse.data;
          localStorage.setItem('token', access_token);

          navigate('/books');
        } else {
          console.error('Authorization code not found in the URL');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    };

    handleAuthCallback();
  }, [navigate, location.search]);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;
