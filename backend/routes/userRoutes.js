const express = require('express');
const {
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const router = express.Router();

router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
