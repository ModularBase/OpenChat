import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #1e1e1e;
  border-top: 1px solid #ffffff;
  position: fixed;
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

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <SendButton onClick={handleSend}>Send</SendButton>
    </InputContainer>
  );
};

export default MessageInput;
