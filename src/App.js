import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import AdminPanel from './components/AdminPanel';
import Profile from './components/Profile';
import BanScreen from './components/BanScreen';
import Auth from './components/Auth';
import styled from 'styled-components';

// Add Google Font (Roboto)
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #000; /* Black background */
  font-family: 'Roboto', sans-serif; /* Modern font */
`;

const TopBar = styled.div`
  background-color: #06b6d4; /* Turquoise */
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const LogoutButton = styled.button`
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #ff0000;
  }
`;

const AdminLink = styled.a`
  color: #fff;
  text-decoration: none;
  background-color: #333;
  padding: 8px 12px;
  border-radius: 8px;
  margin-right: 10px;
  &:hover {
    background-color: #06b6d4;
  }
`;

function MainApp({ user, messages, sendMessage, handleLogout }) {
  return (
    <>
      <TopBar>
        <h2>OpenChat</h2>
        <div>
          {user?.isAdmin && <AdminLink href="/admin">Admin Panel</AdminLink>}
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
      </TopBar>
      <AppContainer>
        <Sidebar user={user} />
        <ChatWindow messages={messages} sendMessage={sendMessage} />
      </AppContainer>
    </>
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
          .select('banned, isAdmin')
          .eq('id', session.user.id)
          .single();

        if (profile?.banned) {
          setIsBanned(true);
          navigate('/ban');
        }

        if (profile?.isAdmin) {
          setUser((prevUser) => ({ ...prevUser, isAdmin: profile.isAdmin }));
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
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  // Fetch and subscribe to real-time messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      setMessages(data);
    };
    fetchMessages();

    const messageChannel = supabase
      .channel('realtime:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, []);

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    await supabase.from('messages').insert([{ content: message, username: user.email }]);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
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
            <MainApp
              user={user}
              messages={messages}
              sendMessage={sendMessage}
              handleLogout={handleLogout}
            />
          ) : (
            <Auth setUser={setUser} />
          )
        }
      />
      <Route path="/profile" element={<Profile user={user} />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/ban" element={<BanScreen />} />
    </Routes>
  );
}

export default App;
