import { pool } from '../model/index.js';

const ActivityController = {};

ActivityController.create = async (values, userId) => {
  const { distance, timer, name, favorite: isFav = false } = values;
  const requiredQuery = `
    INSERT INTO activities (name, timer_second, distance_meter, isfav, userId)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const queryValues = [name, timer, distance, isFav, userId];
  try {
    const result = await pool.query(requiredQuery, queryValues);
    return result.rows[0];
  } catch (err) {
    console.error('Error inserting user:', err);
    throw err;
  }
};

ActivityController.findAllbyUserId = async (userId) => {
  const requiredQuery = `
    select * from activities
    where userId = $1;
    `;

  const queryValues = [userId];
  try {
    const result = await pool.query(requiredQuery, queryValues);
    return result.rows;
  } catch (error) {
    console.error('error While fetching:', error);
    throw error;
  }
};

ActivityController.updateActivityById = async (values, userId, activityId) => {
  const { visible_dashboard } = values;

  const requiredQuery = `
  update activities
  set visible_dashboard = $1
  where userId = $2 and id = $3
  RETURNING *;
  `;

  const queryValues = [visible_dashboard, userId, activityId];
  try {
    const result = await pool.query(requiredQuery, queryValues);
    return result.rows[0];
  } catch (error) {
    console.error('error While updating :', error);
    throw error;
  }
};

ActivityController.deleteActivityById = async (userId, activityId) => {
  const requiredQuery = `
    delete from activities
    where userId = $1 and id = $2;
    `;
  const queryValues = [userId, activityId];

  try {
    const result = await pool.query(requiredQuery, queryValues);
    return result.rows[0];
  } catch (error) {
    console.error('error While deleting :', error);
    throw error;
  }
};

ActivityController.getDashboardActivity = async (userId) => {
  const requiredQuery = `
    select * from activities
    where userId = $1 and visible_dashboard = $2
    `;
  const queryValues = [userId, true];
  try {
    const result = await pool.query(requiredQuery, queryValues);
    return result.rows;
  } catch (error) {
    console.error('error fextching dashboard data :', error);
    throw error;
  }
};

export default ActivityController;
