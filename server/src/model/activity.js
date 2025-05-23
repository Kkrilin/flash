import { pool } from './index.js';

const activityTableQuery = `
  CREATE TABLE IF NOT EXISTS activities (
    id serial PRIMARY KEY,
    distance INTEGER,
    timer INTEGER,
    name TEXT,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`;

const activityTable = async () => {
  try {
    await pool.query(activityTableQuery);
    console.log('Activity Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  }
};

export default activityTable;
