import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

const App: React.FC = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      // Use the token to interact with the Gmail API
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  return (
    <GoogleOAuthProvider clientId="974603092208-bbq3isunpj4v7imv4b73mp6v1pqjug15.apps.googleusercontent.com.apps.googleusercontent.com">
      <button onClick={() => login()}>Login with Google</button>
    </GoogleOAuthProvider>
  );
};

export default App;
