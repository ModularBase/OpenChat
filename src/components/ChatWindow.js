import React, { useState } from 'react';
import styled from 'styled-components';
import Profile from './Profile'; 

const ChatContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #121212;
  color: #ffffff;
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

const ChatWindow = ({ messages }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClick = (username) => {
    setSelectedUser(username);
  };

  return (
    <ChatContainer>
      {messages.map((message) => (
        <Message key={message.id}>
          <Username onClick={() => handleClick(message.username)}>
            {message.username}
          </Username>
          <span>{message.content}</span>
        </Message>
      ))}

      {selectedUser && (
        <Profile username={selectedUser} /> 
      )}
    </ChatContainer>
  );
};

export default ChatWindow;
