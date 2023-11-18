import { Router, Request, Response } from 'express';
import { generateCronExpression, generateReadableExpression } from '../cronGenerator';

export const crontabRoutes = Router();

crontabRoutes.get('/generate', (req: Request, res: Response) => {
  const cronExpression = generateCronExpression();
  let readableExpression: string;

  try {
    readableExpression = generateReadableExpression(cronExpression);
  } catch (error: any) {
    console.error(`Error generating readable expression: ${error.message}`);
    readableExpression = 'Invalid expression';
  }

  res.json({
    expression: cronExpression,
    readableExpression: readableExpression,
  });
});
