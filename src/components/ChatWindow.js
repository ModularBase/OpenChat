import React, { useState } from 'react';
import styled from 'styled-components';
import Profile from './Profile'; 

const ChatContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2e2e2e;
  color: #ffffff;
  height: 100%;
`;

const MessageList = styled.div`
  overflow-y: auto;
  flex: 1;
  margin-bottom: 20px;
`;

const Message = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #1e1e1e;
  display: flex;
  justify-content: space-between;
`;

const Username = styled.span`
  color: #ffffff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #1e1e1e;
  border-top: 1px solid #ffffff;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: #333;
  color: #ffffff;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #ffffff;
  color: #000;
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

const ChatWindow = ({ messages, sendMessage }) => {
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClick = (username) => {
    setSelectedUser(username);
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <ChatContainer>
      <MessageList>
        {messages && messages.map((message) => (
          <Message key={message.id}>
            <Username onClick={() => handleClick(message.username)}>
              {message.username}
            </Username>
            <span>{message.content}</span>
          </Message>
        ))}
      </MessageList>

      <InputContainer>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </InputContainer>

      {selectedUser && <Profile username={selectedUser} />}
    </ChatContainer>
  );
};

export default ChatWindow;
