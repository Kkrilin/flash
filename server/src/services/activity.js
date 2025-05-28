import ActivityController from '../controller/activity.js';

export const createActivity = async (req, res, next) => {
  const { userId } = req;
  const values = req.body;
  try {
    const activity = await ActivityController.create(values, userId);
    if (!activity) {
      throw new Error('activity failed to create');
    }
    res.status(201).json({ success: 1, activity });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

export const getAllActivity = async (req, res, next) => {
  const { userId } = req;
  try {
    const activities = await ActivityController.findAllbyUserId(userId);
    if (!activities) {
      throw new Error('something wen wrong');
    }
    res.status(200).json({ success: 1, activities });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};
// updateActivity,
//   deleteActivity,

export const updateActivity = async (req, res, next) => {
  const { userId } = req;
  const { activityId } = req.params;
  const values = req.body;
  try {
    const activity = await ActivityController.updateActivityById(
      values,
      userId,
      activityId,
    );
    if (!activity) {
      throw new Error('somthing went wrong');
    }
    res.status(200).json({ success: 1, activity });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

export const deleteActivity = async (req, res, next) => {
  const { userId } = req;
  const { activityId } = req.params;

  try {
    await ActivityController.deleteActivityById(userId, activityId);
    res
      .status(200)
      .json({ success: 1, message: 'activity delete successfully' });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

export const getDashboardActivity = async (req, res, next) => {
  const { userId } = req;

  try {
    const { dashboardActivity, chartData } =
      await ActivityController.getDashboardActivity(userId);

    if (!dashboardActivity) {
      throw new Error('something went wrong');
    }
    res.status(200).json({ success: 1, dashboardActivity, chartData });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};
