import React from 'react';
// import Profile from '../../componenets/Profile';
import ProfileForm from '../../componenets/ProfileForm/ProfileForm';

function ProfilePage() {
  return (
    <div className="container">
      {/* <Profile user={{ email: '' }} /> */}
      <ProfileForm onSubmit={() => {}} />
    </div>
  );
}

export default ProfilePage;
