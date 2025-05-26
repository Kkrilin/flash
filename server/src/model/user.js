import { pool } from './index.js';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    gender TEXT,
    aadhar_number VARCHAR(20),
    age VARCHAR(4),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
