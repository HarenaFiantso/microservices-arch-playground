import { clerkPlugin } from '@clerk/fastify';
import { connectOrderDB } from '@kitro/order-db';
import Fastify from 'fastify';

import { shouldBeUser } from './middleware/auth.middleware.js';
import { orderRoute } from './routes/order.route.js';
import { consumer, producer } from './utils/kafka.js';
import { runKafkaSubscriptions } from './utils/subscriptions.js';

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get('/health', (request, reply) => {
  return reply.status(200).send({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get('/test', { preHandler: shouldBeUser }, (request, reply) => {
  return reply.send({
    message: 'Order service is authenticated!',
    userId: request.userId,
  });
});

fastify.register(orderRoute);

const start = async () => {
  try {
    await Promise.all([connectOrderDB(), producer.connect(), consumer.connect()]);
    await runKafkaSubscriptions();
    await fastify.listen({ port: 8001 });
    console.log('Order service is running on port 8001');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
