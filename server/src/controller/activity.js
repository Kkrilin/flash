import { pool } from '../model/index.js';

const ActivityController = {};

ActivityController.create = async (values, userId) => {
  const { distance, timer, name, favorite: isFav = false } = values;
  const requiredQuery = `
    INSERT INTO activities (name, timer_second, distance_meter, isfav, userId)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  console.log('values', values);
  const queryValues = [name, timer, distance, isFav, userId];
  const client = await pool.connect()
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
    where userId = $1
    order by id desc;
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
  const queryForChartsData = `
  SELECT 
  name, 
  count(*) as count,
  SUM(distance_meter) AS total_distance, 
  ROUND(SUM(timer_second)::numeric, 2) AS total_time
FROM 
  activities
WHERE 
  userId = $1
GROUP BY 
  name;
   `;

  const client = await pool.connect();
  const queryValues = [userId, true];
  try {
    const chartData = await client.query(queryForChartsData, [userId]);
    const result = await client.query(requiredQuery, queryValues);
    return { dashboardActivity: result.rows, chartData: chartData.rows };
  } catch (error) {
    console.error('error fextching dashboard data :', error);
    throw error;
  } finally {
    client.release();
  }
};

export default ActivityController;
