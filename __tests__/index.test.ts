import request from 'supertest';
import express from 'express';
import { generateCronExpression, generateReadableExpression } from '../src/cronGenerator';

const app = express();

app.get('/v1/generate', (req, res) => {
  const cronExpression = generateCronExpression();
  let readableExpression: string;

  try {
    readableExpression = generateReadableExpression(cronExpression);
  } 
  catch (error: any) {
    console.error(`Error generating readable expression: ${error.message}`);
    readableExpression = 'Invalid expression';
  }

  res.json({
    expression: cronExpression,
    readableExpression: readableExpression,
  });
});

describe('GET /v1/generate', () => {
  it('should return a valid readableExpression for a generated cronExpression', async () => {
    const response = await request(app).get('/v1/generate');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('expression');
    expect(response.body).toHaveProperty('readableExpression');

    const generatedReadableExpression = generateReadableExpression(response.body.expression);

    expect(generatedReadableExpression).not.toBe('Invalid cron expression');
  });
});
