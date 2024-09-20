import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import styled from 'styled-components';

const AdminPanelContainer = styled.div`
  padding: 20px;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  margin-bottom: 10px;
`;

const BanButton = styled.button`
  background-color: ${props => (props.banned ? '#5c5cff' : '#ff5c5c')};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) {
        console.error('Error fetching users:', error.message);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  const toggleBanUser = async (userId, currentStatus) => {
    const { error } = await supabase
      .from('profiles')
      .update({ banned: !currentStatus })
      .eq('id', userId);

    if (error) {
      alert('Error banning/unbanning user');
    } else {
      setUsers(users.map(user => (user.id === userId ? { ...user, banned: !currentStatus } : user)));
    }
  };

  return (
    <AdminPanelContainer>
      <h2>Admin Panel</h2>
      {users.map((user) => (
        <UserRow key={user.id}>
          <span>{user.username}</span>
          <BanButton
            banned={user.banned}
            onClick={() => toggleBanUser(user.id, user.banned)}
          >
            {user.banned ? 'Unban' : 'Ban'}
          </BanButton>
        </UserRow>
      ))}
    </AdminPanelContainer>
  );
};

export default AdminPanel;
