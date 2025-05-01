const db = require('../../db'); // Adjust path if needed

// CREATE employee
const createEmployee = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO user (email, password, role, first_name, last_name) VALUES (?, ?, "EMPLOYEE", ?, ?)',
      [email, password, first_name, last_name]
    );

    res.status(201).json({ message: 'Employee created', employeeId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ all employees
const getAllEmployees = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM user WHERE role = 'EMPLOYEE'"
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { email, first_name, last_name, is_approved } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE user SET email = ?, first_name = ?, last_name = ?, is_approved = ? WHERE user_id = ? AND role = "EMPLOYEE"',
      [email, first_name, last_name, is_approved, id]
    );

    res.status(200).json({ message: 'Employee updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute(
      'DELETE FROM user WHERE user_id = ? AND role = "EMPLOYEE"',
      [id]
    );

    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
};

