import { pool } from './index.js';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    mobile_number VARCHAR(15),
    gender TEXT,
    aadhar_number VARCHAR(20),
    age INT,
    address TEXT
  );
`;

const userTable = async () => {
  try {
    await pool.query(createTableQuery);
    console.log('User Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  }
};

export default userTable;
