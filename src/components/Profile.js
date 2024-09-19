import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BadgeWithTooltip from './BadgeWithTooltip';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const BadgeSection = styled.div`
  margin-top: 20px;
`;

const Profile = ({ user }) => {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || 'Anonymous');
      setAvatarUrl(user.avatar_url || 'https://via.placeholder.com/100');
    }
  }, [user]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <ProfileContainer>
      <h2>{username}'s Profile</h2>
      <ProfilePicture src={avatarUrl} alt="Profile Avatar" />
      <h3>Badges</h3>
      <BadgeSection>
        <BadgeWithTooltip isAdmin={user.isAdmin} tooltipText="This user is an Admin" />
        <BadgeWithTooltip isAdmin={false} tooltipText="This user is a regular member" />
      </BadgeSection>
    </ProfileContainer>
  );
};

export default Profile;
