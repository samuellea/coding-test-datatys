import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-hot-toast';
import ProfileForm from '../../componenets/ProfileForm/ProfileForm';
import styles from './index.module.css';
// eslint-disable-next-line object-curly-newline
import { createUser, getUsers, deleteUser, updateUser } from '../../api';

function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // For handling editingusers

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (userData) => {
    try {
      if (selectedUser) {
        // Update user if selectedUser exists
        const updatedUser = await updateUser(selectedUser.id, userData);
        toast.success('User updated successfully!');
        setUsers(
          // eslint-disable-next-line comma-dangle
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      } else {
        const user = await createUser(userData);
        toast.success('User created successfully!');
        setUsers([...users, user]);
      }
      setShowForm(false);
      setSelectedUser(null); // Reset selected user after form submission
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers(); // Re-fetch users after deletion
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error('Error deleting user!');
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Set the user to be edited
    setShowForm(true); // Show the form to edit the user
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <button
          type="button"
          onClick={() => {
            setShowForm(true);
            setSelectedUser(null); // Clear selected user for creating a new one
          }}
          className={styles.button}
        >
          New User
        </button>
        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            fetchUsers();
          }}
          className={styles.button}
        >
          Manage Users
        </button>
      </div>

      <div className={styles.mainContent}>
        {showForm ? (
          <ProfileForm
            onSubmit={handleSubmit}
            defaultValues={selectedUser || {}} // Pass selectedUser for editing or empty for new user (?!)
          />
        ) : (
          <div>
            <h2>Manage Users</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className={styles.userCards}>
                {users.length === 0 ? (
                  <p>No users found.</p>
                ) : (
                  users.map((user) => (
                    <div key={user.id} className={styles.userCard}>
                      <h3>
                        {user.firstname}
                        {user.lastname}
                      </h3>
                      <p>
                        Email:
                        {user.email}
                      </p>
                      <p>
                        Phone:
                        {user.phonenumber}
                      </p>
                      <div>
                        <button
                          type="button"
                          onClick={() => handleEdit(user)}
                          className={styles.editButton}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(user.id)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
