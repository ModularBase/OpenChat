import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styled from 'styled-components';

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #121212;
  color: white;
  padding: 20px;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
  width: 300px;
  background-color: #333;
  color: white;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #06b6d4;
  color: white;
  border: none;
  cursor: pointer;
  width: 300px;
  margin-top: 10px;
  &:hover {
    background-color: #048eab;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

function Auth({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    setErrorMessage(null);

    const { data: { user }, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMessage(`Sign Up Error: ${error.message}`);
    } else if (user) {
      await supabase
        .from('profiles')
        .insert([{ id: user.id, username }]);
      setUser(user);
      alert('Sign-up successful. Please check your email for confirmation.');
      navigate('/');
    }
    setLoading(false);
  };

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(`Sign In Error: ${error.message}`);
    } else if (data?.user) {
      setUser(data.user);
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <AuthContainer>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isSignUp && (
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <Button onClick={isSignUp ? handleSignUp : handleSignIn} disabled={loading}>
        {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
      </Button>
      <Button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
      </Button>
    </AuthContainer>
  );
}

export default Auth;
