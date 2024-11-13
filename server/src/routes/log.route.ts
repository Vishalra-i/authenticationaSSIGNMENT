import express, { Request, Response, Router } from 'express'
import {createUser , login , logout } from '../controller/user.controller' ;
import jwtAuth from '../middlewares/auth.middleware';
import logMiddleware from '../middlewares/logger.middleware';
import Log from '../models/log.model';

const router = Router() ;

router.get('/logs', jwtAuth, async (req: Request, res: Response) => {

  const { actionType, startDate, endDate, page = 1, limit = 10 } = req?.query;

  const query: Record<string, unknown> = { isDeleted: false };
  if (actionType) query.actionType = actionType;
  if (startDate && endDate) query.timestamp = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };

  try {
    const logs = await Log.find(query)
      .sort({ timestamp: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const totalLogs = await Log.countDocuments(query);

    res.json({
      logs,
      totalLogs,
      totalPages: Math.ceil(totalLogs / +limit),
      currentPage: +page,
    });
  } catch (err) {
    res.status(500).send('Error fetching logs');
  }
});


export default router ;