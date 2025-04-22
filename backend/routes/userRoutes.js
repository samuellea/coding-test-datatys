const express = require('express');
const {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const router = express.Router();

router.get('/', fetchUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
