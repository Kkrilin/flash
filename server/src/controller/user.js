import { pool } from '../model/index.js';

const UserController = {};

UserController.findOneById = async (userId) => {
  const requiredQuery = `
  SELECT * from users
  WHERE id = $1
  `;
  try {
    const result = await pool.query(requiredQuery, [userId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user:', err);
    throw err;
  }
};

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

UserController.findOneByAadhar_number = async (aadharNumber) => {
  const requiredQuery = `
    SELECT * FROM users
    WHERE aadhar_number = $1
    `;
  try {
    const result = await pool.query(requiredQuery, [aadharNumber]);
    return result.rows[0];
  } catch (err) {
    console.error('Error finding user by aadhar_number:', err);
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

UserController.updateUserById = async (values, userId) => {
  const { age, gender, aadhar_number, address } = values;

  const requiredQuery = `
  update users
  set age = $2,
      gender = $3,
      aadhar_number = $4,
      address = $5,
      updated_at = CURRENT_TIMESTAMP
      where id = $1
      RETURNING *;
  `;

  const queryValues = [userId, age, gender, aadhar_number, address];

  try {
    const result = await pool.query(requiredQuery, queryValues);
    console.log('result', result);
    return result.rows[0];
  } catch (error) {
    console.error('error updating user:', error);
    throw error;
  }
};

export default UserController;
