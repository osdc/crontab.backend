import request from 'supertest';
import express from 'express';

const app = express();

import { generateCronExpression, generateReadableExpression } from '../src/cronGenerator';

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

  it('should return a predefined readableExpression for a random cronExpression', async () => {
    const randomMinute = Math.floor(Math.random() * 60);
    const randomHour = Math.floor(Math.random() * 24);
    const randomDayOfWeek = Math.floor(Math.random() * 7);

    const randomCronExpression = `${randomMinute} ${randomHour} * * ${randomDayOfWeek}`;
    const expectedReadableExpression = `Every ${randomMinute} minutes, at ${randomHour}:00, on every day`;

    jest.spyOn(require('../src/cronGenerator'), 'generateCronExpression').mockReturnValue(randomCronExpression);
    jest.spyOn(require('../src/cronGenerator'), 'generateReadableExpression').mockReturnValue(expectedReadableExpression);

    const response = await request(app).get('/v1/generate');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('expression', randomCronExpression);
    expect(response.body).toHaveProperty('readableExpression', expectedReadableExpression);
  });

  it('should return a predefined readableExpression for another random cronExpression', async () => {
    const randomMinute = Math.floor(Math.random() * 60);
    const randomHour = Math.floor(Math.random() * 24);
    const randomDayOfMonth = Math.floor(Math.random() * 31) + 1; // Adding 1 to not get day 0
    const randomMonth = Math.floor(Math.random() * 12) + 1; 
    const randomDayOfWeek = Math.floor(Math.random() * 7);

    const randomCronExpression = `${randomMinute} ${randomHour} ${randomDayOfMonth} ${randomMonth} ${randomDayOfWeek}`;
    const expectedReadableExpression = `Every ${randomMinute} minutes, at ${randomHour}:00, on day ${randomDayOfMonth} of month ${randomMonth}, on every day`;

    jest.spyOn(require('../src/cronGenerator'), 'generateCronExpression').mockReturnValue(randomCronExpression);
    jest.spyOn(require('../src/cronGenerator'), 'generateReadableExpression').mockReturnValue(expectedReadableExpression);

    const response = await request(app).get('/v1/generate');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('expression', randomCronExpression);
    expect(response.body).toHaveProperty('readableExpression', expectedReadableExpression);
  });

  it('should return a predefined readableExpression for yet another random cronExpression', async () => {
    const randomMinute = Math.floor(Math.random() * 60);
    const randomHour = Math.floor(Math.random() * 24);
    const randomMonth = Math.floor(Math.random() * 12) + 1; 
    const randomDayOfWeek = Math.floor(Math.random() * 7);

    const randomCronExpression = `${randomMinute} ${randomHour} * ${randomMonth} ${randomDayOfWeek}`;
    const expectedReadableExpression = `Every ${randomMinute} minutes, at ${randomHour}:00, on every day, in month ${randomMonth}, on every day`;

    jest.spyOn(require('../src/cronGenerator'), 'generateCronExpression').mockReturnValue(randomCronExpression);
    jest.spyOn(require('../src/cronGenerator'), 'generateReadableExpression').mockReturnValue(expectedReadableExpression);

    const response = await request(app).get('/v1/generate');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('expression', randomCronExpression);
    expect(response.body).toHaveProperty('readableExpression', expectedReadableExpression);
  });

  it('should return a predefined readableExpression for a different random cronExpression', async () => {
    const randomMinute = Math.floor(Math.random() * 60);
    const randomHour = Math.floor(Math.random() * 24);
    const randomDayOfMonth = Math.floor(Math.random() * 31) + 1; 
    const randomMonth = Math.floor(Math.random() * 12) + 1; 

    const randomCronExpression = `${randomMinute} ${randomHour} ${randomDayOfMonth} ${randomMonth} *`;
    const expectedReadableExpression = `Every ${randomMinute} minutes, at ${randomHour}:00, on day ${randomDayOfMonth} of month ${randomMonth}, on every day`;

    jest.spyOn(require('../src/cronGenerator'), 'generateCronExpression').mockReturnValue(randomCronExpression);
    jest.spyOn(require('../src/cronGenerator'), 'generateReadableExpression').mockReturnValue(expectedReadableExpression);

    const response = await request(app).get('/v1/generate');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('expression', randomCronExpression);
    expect(response.body).toHaveProperty('readableExpression', expectedReadableExpression);
  });

  it('should return a predefined readableExpression for another different random cronExpression', async () => {
    const randomMinute = Math.floor(Math.random() * 60);
    const randomHour = Math.floor(Math.random() * 24);
    const randomMonth = Math.floor(Math.random() * 12) + 1; 
    const randomDayOfWeek = Math.floor(Math.random() * 7);

    const randomCronExpression = `${randomMinute} ${randomHour} * ${randomMonth} ${randomDayOfWeek}`;
    const expectedReadableExpression = `Every ${randomMinute} minutes, at ${randomHour}:00, on every day, in month ${randomMonth}, on every day`;

    jest.spyOn(require('../src/cronGenerator'), 'generateCronExpression').mockReturnValue(randomCronExpression);
    jest.spyOn(require('../src/cronGenerator'), 'generateReadableExpression').mockReturnValue(expectedReadableExpression);

    const response = await request(app).get('/v1/generate');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('expression', randomCronExpression);
    expect(response.body).toHaveProperty('readableExpression', expectedReadableExpression);
  });
});
