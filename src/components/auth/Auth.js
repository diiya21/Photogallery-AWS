import React, { useState } from 'react';
import { cognito } from '../../services/aws/awsConfig';
import CryptoJS from 'crypto-js'; // You will need to install this for hashing

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state

  const clientId = 'trs8lv5idj94hlv0877hsgc8p'; // New App Client ID
  const clientSecret = 'jlqr7aif135qm6tt812f49t8798g9ftnnbdqbbm94op90h2d3h9'; // New App Client Secret

  // Compute the SECRET_HASH
  const calculateSecretHash = (username) => {
    const message = username + clientId;
    const secretHash = CryptoJS.HmacSHA256(message, clientSecret);
    return secretHash.toString(CryptoJS.enc.Base64);
  };

  const handleAuth = async () => {
    setLoading(true); // Start loading state
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
    } finally {
      setLoading(false); // Stop loading state after the action completes
    }
  };

  // Inline styles for Auth component
  const styles = {
    authContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#2c3e50',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
    },
    form: {
      width: '300px',
      backgroundColor: '#34495e',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '4px',
      border: '1px solid #7f8c8d',
      backgroundColor: '#ecf0f1',
      color: '#2c3e50',
    },
    button: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#e74c3c',
      color: 'white',
      fontSize: '1.2em',
      cursor: 'pointer',
    },
    disabledButton: {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
    },
    error: {
      color: '#e74c3c',
      fontSize: '0.9em',
      marginBottom: '10px',
    },
    toggleAuth: {
      color: '#ecf0f1',
      fontSize: '0.9em',
      textAlign: 'center',
      cursor: 'pointer',
    },
    toggleAuthHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.authContainer}>
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      <div style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {error && <div style={styles.error}>{error}</div>}

        <button 
          onClick={handleAuth} 
          disabled={loading} 
          style={loading ? { ...styles.button, ...styles.disabledButton } : styles.button}
        >
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
        </button>

        <p 
          style={styles.toggleAuth} 
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
