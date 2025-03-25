import React, { useState } from 'react';
import { cognito } from '../../services/aws/awsConfig'; 
import CryptoJS from 'crypto-js'; // You will need to install this for hashing

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const clientId = 'trs8lv5idj94hlv0877hsgc8p'; // New App Client ID
  const clientSecret = 'jlqr7aif135qm6tt812f49t8798g9ftnnbdqbbm94op90h2d3h9'; // New App Client Secret
  // const identityPoolId = 'us-west-2:0b8fec4a-c7f9-43a2-a67e-8db326f37210'; // Identity Pool ID

  // Compute the SECRET_HASH
  const calculateSecretHash = (username) => {
    const message = username + clientId;
    const secretHash = CryptoJS.HmacSHA256(message, clientSecret);
    return secretHash.toString(CryptoJS.enc.Base64);
  };

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        const secretHash = calculateSecretHash(email); // Calculate SECRET_HASH

        await cognito.signUp({
          ClientId: clientId,
          Username: email, // Using email as the username
          Password: password,
          UserAttributes: [
            { Name: 'email', Value: email } // Email is passed as the attribute
          ],
          SecretHash: secretHash, // Send the SECRET_HASH
        }).promise();
        alert('Sign-up successful! Now log in.');
      } else {
        const secretHash = calculateSecretHash(email); // Calculate SECRET_HASH

        const result = await cognito.initiateAuth({
          ClientId: clientId,
          AuthFlow: 'USER_PASSWORD_AUTH',
          AuthParameters: { USERNAME: email, PASSWORD: password, SECRET_HASH: secretHash }, // Include SECRET_HASH
        }).promise();
        setUser(result);
        alert('Sign-in successful!');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className="error">{error}</div>}
      <button onClick={handleAuth}>
        {isSignUp ? 'Sign Up' : 'Log In'}
      </button>
      <p onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
      </p>
    </div>
  );
};

export default Auth;
