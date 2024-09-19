import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 300px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Username = styled.h3`
  color: white;
`;

const Sidebar = ({ user }) => (
  <SidebarContainer>
    <ProfileSection>
      <Avatar src={user.avatar_url || 'https://via.placeholder.com/50'} alt="Profile" />
      <div>
        <Username>{user.username || 'User'}</Username>
      </div>
    </ProfileSection>
    {/* User list removed */}
  </SidebarContainer>
);

export default Sidebar;
