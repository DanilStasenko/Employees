const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET api/employees
 * @desc Get all employees
 * @access Private
 */
const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch (error) {
    console.error('Error during get all employees: ', error);
    res.status(500).json({ message: "Couldn't get all employees" });
  }
};

/**
 * @route GET api/employees/:id
 * @desc Get employee
 * @access Private
 */
const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(employee);
  } catch (error) {
    console.error('Error during get employee: ', error);
    res.status(500).json({ message: "Couldn't get employee" });
  }
};

/**
 * @route POST api/employees/add
 * @desc Add employee
 * @access Private
 */
const addEmployee = async (req, res) => {
  const data = req.body;

  try {
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
  } catch (error) {
    console.error('Error during add employee: ', error);
    res.status(500).json({ message: "Couldn't add employee" });
  }
};

/**
 * @route POST api/employees/delete/:id
 * @desc Delete employee
 * @access Private
 */
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json('Employee deleted successfully');
  } catch (error) {
    console.error('Error during delete employee: ', error);
    res.status(500).json({ message: "Couldn't delete employee" });
  }
};

/**
 * @route PUT api/employees/edit/:id
 * @desc Edit employee
 * @access Private
 */
const editEmployee = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json('Employee edited successfully');
  } catch (error) {
    console.error('Error during edit employee: ', error);
    res.status(500).json({ message: "Couldn't edit employee" });
  }
};

module.exports = {
  getAllEmployees,
  getEmployee,
  addEmployee,
  deleteEmployee,
  editEmployee,
};
