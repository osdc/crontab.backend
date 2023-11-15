import express from 'express';

import { generateCronExpression, generateReadableExpression } from './cronGenerator';

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

