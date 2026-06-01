import express, { Request, Response } from 'express';

const app = express();

app.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
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
