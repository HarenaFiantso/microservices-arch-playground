import { clerkMiddleware } from '@hono/clerk-auth';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import sessionRoute from './routes/session.route.js';
import webhookRoute from './routes/webhook.route.js';
import { consumer, producer } from './utils/kafka.js';
import { runKafkaSubscriptions } from './utils/subscriptions.js';

const app = new Hono();

app.use('*', cors({ origin: ['http://localhost:3002'] }));
app.use('*', clerkMiddleware());

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.route('/sessions', sessionRoute);
app.route('/webhooks', webhookRoute);

const start = async () => {
  try {
    Promise.all([await producer.connect(), await consumer.connect()]);
    await runKafkaSubscriptions();
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      () => {
        console.log(`Payment service is running on port 8002`);
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
