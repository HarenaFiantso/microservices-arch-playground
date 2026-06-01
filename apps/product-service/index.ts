import { clerkMiddleware } from '@clerk/express';
import express, { Request, Response } from 'express';

import { shouldBeUser } from './middleware/auth.middleware';

const app = express();

app.use(clerkMiddleware());

app.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get('/test', shouldBeUser, (req, res) => {
  res.json({ message: 'Product service authenticated', userId: req.userId });
});

const start = async () => {
  try {
    app.listen(process.env.PORT || 8000, () => {
      console.log('Product service is running on ' + (process.env.PORT || 8000));
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
