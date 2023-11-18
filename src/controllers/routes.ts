import { Router } from 'express';
import { crontabRoutes } from './cron';

export const routes = Router();

routes.use('/v1/crontab', crontabRoutes);
// Add more routes as needed (e.g., routes.use('/v1/users', userRoutes) for user-related routes)
