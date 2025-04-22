const db = require('../sql/db');

const fetchUsers = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM users ORDER BY created_at DESC'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const createUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    country,
    city,
    phoneNumber,
    position,
  } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO users (email, password, firstName, lastName, country, city, phoneNumber, position) VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, NULL)) RETURNING *',
      [
        email,
        password,
        firstName,
        lastName,
        country,
        city,
        phoneNumber,
        position,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, firstName, lastName, country, city, phoneNumber } =
    req.body;

  try {
    const result = await db.query(
      'UPDATE users SET email = $1, password = $2, firstName = $3, lastName = $4, country = $5, city = $6, phoneNumber = $7, position = $8, updated_at = NOW() WHERE id = $9 RETURNING *',
      [email, password, firstName, lastName, country, city, phoneNumber, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = { fetchUsers, createUser, updateUser, deleteUser };
