import React from 'react';
import ProfileForm from '../../componenets/ProfileForm/ProfileForm';
import { createUser } from '../../api';

function ProfilePage() {
  const onSubmit = async (userData) => {
    try {
      const user = await createUser(userData);
      console.log('User created:', user);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="container">
      <ProfileForm onSubmit={onSubmit} />
    </div>
  );
}

export default ProfilePage;
