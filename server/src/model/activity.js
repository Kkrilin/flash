import { pool } from './index.js';

const activityTableQuery = `
  CREATE TABLE IF NOT EXISTS activities (
    id serial PRIMARY KEY,
    distance_meter INTEGER NOT NULL,
    timer_second REAL NOT NULL ,
    name TEXT NOT NULL,
    isfav BOOLEAN NOT NULL DEFAULT false,
    visible_dashboard BOOLEAN NOT NULL DEFAULT false,
    userId INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
