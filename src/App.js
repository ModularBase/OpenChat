import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import AdminPanel from './components/AdminPanel';
import Profile from './components/Profile';
import BanScreen from './components/BanScreen';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  backdrop-filter: blur(10px);
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  background: rgba(255, 255, 255, 0.3);
  color: #000;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  width: 300px;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

function Auth({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { error, user } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(`Sign Up Error: ${error.message}`);
    } else if (user) {
      setUser(user);
      alert('Sign-up successful. Please check your email for confirmation.');
      await supabase.from('profiles').insert([{ id: user.id, username }]);
      navigate('/');
    }
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`Sign In Error: ${error.message}`);
    } else if (data.session) {
      setUser(data.session.user);
      navigate('/');
    }
  };

  return (
    <AuthContainer>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
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
      <Button onClick={isSignUp ? handleSignUp : handleSignIn}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Button>
      <Button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
      </Button>
    </AuthContainer>
  );
}

function MainApp({ user, messages, sendMessage }) {
  return (
    <AppContainer>
      <Sidebar user={user} />
      <ChatWindow messages={messages} sendMessage={sendMessage} />
    </AppContainer>
  );
}

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [isBanned, setIsBanned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('banned')
          .eq('id', session.user.id)
          .single();

        if (profile?.banned) {
          setIsBanned(true);
          navigate('/ban');
        }
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        navigate('/');
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
      setMessages(data);
    };
    fetchMessages();
  }, []);

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    await supabase.from('messages').insert([{ content: message, username: user.email }]);
  };

  if (isBanned) {
    return <BanScreen />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <MainApp user={user} messages={messages} sendMessage={sendMessage} />
          ) : (
            <Auth setUser={setUser} />
          )
        }
      />
      <Route path="/profile" element={<Profile user={user} />} />
      <Route path="/admin" element={user?.isAdmin ? <AdminPanel /> : <h2>You do not have access</h2>} />
      <Route path="/ban" element={<BanScreen />} />
    </Routes>
  );
}

export default App;
