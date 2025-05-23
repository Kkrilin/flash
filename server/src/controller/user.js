import { pool } from '../model/index.js';

const UserController = {};

UserController.findOneByEmail = async (email) => {
  const requiredQuery = `
      SELECT * FROM users
      WHERE email = $1
    `;

  try {
    const result = await pool.query(requiredQuery, [email]);
    return result.rows[0];
  } catch (err) {
    console.error('Error finding user by email:', err);
    throw err;
  }
};

UserController.findOneByMobileNumber = async (mobileNumber) => {
  const requiredQuery = `
    SELECT * FROM users
    WHERE mobile_number = $1
    `;
  try {
    const result = await pool.query(requiredQuery, [mobileNumber]);
    return result.rows[0];
  } catch (err) {
    console.error('Error finding user by mobile_number:', err);
    throw err;
  }
};

UserController.signUpUser = async (values) => {
  const { name, email, password, mobileNumber: number } = values;
  console.log('value', values);
  const userInsertQuery = `
    INSERT INTO users (name, email, password, mobile_number)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const queryValues = [name, email, password, number];
  try {
    const result = await pool.query(userInsertQuery, queryValues);
    return result.rows[0];
  } catch (err) {
    console.error('Error inserting user:', err);
    throw err;
  }
};

export default UserController;
