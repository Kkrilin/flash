import { pool } from './index.js';

const performanceTableQuery = `
  CREATE TABLE IF NOT EXISTS performances (
    id serial PRIMARY KEY,
    speed INTEGER,
    userId INTEGER,
    activityId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (activityId) REFERENCES activities(id)
  );
`;

const performanceTable = async () => {
  try {
    await pool.query(performanceTableQuery);
    console.log('Performance Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  }
};

export default performanceTable;
