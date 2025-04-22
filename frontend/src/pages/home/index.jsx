import React, { useState, useEffect } from 'react';
import { createUser, getUsers, deleteUser } from '../../api';
import ProfileForm from '../../componenets/ProfileForm/ProfileForm';
import styles from './index.module.css';

function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const user = await createUser(userData);
      console.log('User created:', user);
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = async (userId) => {
    console.log('Edit user with ID:', userId);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3>Sidebar</h3>
        <button
          type="button"
          onClick={() => setShowForm(true)}
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
          <ProfileForm onSubmit={handleSubmit} />
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
                        {user.first_name}
                        {user.last_name}
                      </h3>
                      <p>
                        Email:
                        {user.email}
                      </p>
                      <p>
                        Phone:
                        {user.phone_number}
                      </p>
                      <div>
                        <button
                          type="button"
                          onClick={() => handleEdit(user.id)}
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
