import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 300px;
  background-color: #121212;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
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
  font-weight: 500;
`;

const AdminLink = styled.a`
  color: white;
  text-decoration: none;
  background-color: #333;
  padding: 10px 15px;
  border-radius: 8px;
  margin-top: 20px;
  &:hover {
    background-color: #06b6d4;
  }
`;

const Sidebar = ({ user }) => (
  <SidebarContainer>
    <ProfileSection>
      <Avatar src={user.avatar_url || 'https://via.placeholder.com/50'} alt="Profile" />
      <div>
        <Username>{user.username || 'User'}</Username>
      </div>
    </ProfileSection>

    {/* Show Admin Panel link if the user is an admin */}
    {user?.isAdmin && (
      <AdminLink href="/admin">Admin Panel</AdminLink>
    )}
  </SidebarContainer>
);

export default Sidebar;
