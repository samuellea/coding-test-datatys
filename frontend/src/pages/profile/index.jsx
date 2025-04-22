import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import toast from 'react-hot-toast';
import ProfileForm from '../../componenets/ProfileForm/ProfileForm';
import { createUser } from '../../api';

function ProfilePage() {
  const onSubmit = async (userData, reset) => {
    try {
      const user = await createUser(userData);
      console.log('User created:', user);

      toast.success('User created successfully!');

      reset();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Error creating user. Please try again!');
    }
  };

  return (
    <div className="container">
      <ProfileForm onSubmit={onSubmit} />
    </div>
  );
}

export default ProfilePage;
