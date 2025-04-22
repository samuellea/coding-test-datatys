const db = require('../sql/db');

const createUser = async (req, res) => {
  const {
    email,
    password,
    first_name,
    last_name,
    country,
    city,
    phone_number,
    position,
  } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO users (email, password, first_name, last_name, country, city, phone_number, position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        email,
        password,
        first_name,
        last_name,
        country,
        city,
        phone_number,
        position,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = { createUser, updateUser, deleteUser };
