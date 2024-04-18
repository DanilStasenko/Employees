const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');

const {
  getAllEmployees,
  addEmployee,
  deleteEmployee,
  editEmployee,
  getEmployee,
} = require('../controllers/employees');

// /api/employees
router.get('/', auth, getAllEmployees);
// /api/employees/:id
router.get('/:id', auth, getEmployee);
// /api/employees/add
router.post('/add', auth, addEmployee);
// /api/employees/delete/:id
router.delete('/delete/:id', auth, deleteEmployee);
// /api/employees/edit/:id
router.put('/edit/:id', auth, editEmployee);

module.exports = router;
