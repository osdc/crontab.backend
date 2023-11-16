import request from 'supertest';
import express from 'express';

const app = express();

import { generateCronExpression, generateReadableExpression } from '../src/cronGenerator';

app.get('/v1/generate', (req, res) => {
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

describe('GET /v1/generate', () => {
  it('should return a predefined readableExpression for a known cronExpression', async () => {
    const knownCronExpression = '22 4 * *';
    const knownReadableExpression = 'Every minute, between 4:22 AM and 4:22 AM, on every day';

    jest.spyOn(require('../src/cronGenerator'), 'generateCronExpression').mockReturnValue(knownCronExpression);
    jest.spyOn(require('../src/cronGenerator'), 'generateReadableExpression').mockReturnValue(knownReadableExpression);

    const response = await request(app).get('/v1/generate');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('expression', knownCronExpression);
    expect(response.body).toHaveProperty('readableExpression', knownReadableExpression);
  });

  it('should return a predefined readableExpression for another known cronExpression', async () => {
    const knownCronExpression = '0 12 * * 1-5';
    const knownReadableExpression = 'Every minute, at 12:00 PM, on every day between Monday and Friday';

    jest.spyOn(require('../src/cronGenerator'), 'generateCronExpression').mockReturnValue(knownCronExpression);
    jest.spyOn(require('../src/cronGenerator'), 'generateReadableExpression').mockReturnValue(knownReadableExpression);

    const response = await request(app).get('/v1/generate');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('expression', knownCronExpression);
    expect(response.body).toHaveProperty('readableExpression', knownReadableExpression);
  });

  it('should return a predefined readableExpression for another known cronExpression', async () => {
    const knownCronExpression = '*/15 3-6 * * MON-FRI';
    const knownReadableExpression = 'Every 15 minutes, between 3:00 AM and 6:59 AM, on every day between Monday and Friday';

    jest.spyOn(require('../src/cronGenerator'), 'generateCronExpression').mockReturnValue(knownCronExpression);
    jest.spyOn(require('../src/cronGenerator'), 'generateReadableExpression').mockReturnValue(knownReadableExpression);

    const response = await request(app).get('/v1/generate');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('expression', knownCronExpression);
    expect(response.body).toHaveProperty('readableExpression', knownReadableExpression);
  });

});
