import config from '../config.js';
import activityTable from './activity.js';
import performanceTable from './performance.js';
import userTable from './user.js';
import pg from 'pg';

const { Pool } = pg;

const dbConfig = {
  user: config.db.username,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  max: 20,
  idleTimeoutMillis: 30000,
};

export const pool = new Pool(dbConfig);

pool
  .connect()
  .then(async (client) => {
    console.log('Connected to PostgreSQL database');
    // await client.query(`DROP TABLE IF EXISTS users cascade;`);
    // await client.query(`DROP TABLE IF EXISTS performances;`);
    // await client.query(`DROP TABLE IF EXISTS activities;`);
    client.release();
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

(async () => {
  await userTable();
  await activityTable();
  await performanceTable();
})();
