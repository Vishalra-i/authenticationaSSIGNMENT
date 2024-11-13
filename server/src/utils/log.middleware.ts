import Log from '../models/log.model';

const logUserAction = async (
  actionType: string,
  userId: string,
  role: string,
  additionalData: Record<string, unknown> = {}
) => {
  try {
    const log = new Log({
      actionType,
      userId,
      role,
      additionalData,
      timestamp: new Date(),
    });
    await log.save();
  } catch (error) {
    console.error('Error logging user action:', error);
  }
};

export default logUserAction;
