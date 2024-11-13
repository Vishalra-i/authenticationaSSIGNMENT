import Log from './models/log';

const logUserAction = async (actionType, userId, role, additionalData = null) => {
  const log = new Log({
    actionType,
    userId,
    role,
    additionalData
  });
  await log.save();
};

export default logUserAction;
