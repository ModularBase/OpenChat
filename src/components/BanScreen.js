import React from 'react';
import styled from 'styled-components';

const BanScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(255, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const BanMessage = styled.h1`
  color: red;
  font-size: 3rem;
`;

const BanScreen = () => (
  <BanScreenContainer>
    <BanMessage>Your account has been banned.</BanMessage>
    <p>If you believe this is an error, please contact support.</p>
  </BanScreenContainer>
);

export default BanScreen;
