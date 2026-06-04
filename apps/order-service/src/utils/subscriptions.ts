import { consumer } from './kafka.js';
import { createOrder } from './order.js';

export const runKafkaSubscriptions = async () => {
  consumer.subscribe([
    {
      topicName: 'payment.successful',
      topicHandler: async (message) => {
        console.log('PAYMENT EVENT RECEIVED');
        console.log(message.value);

        const order = message.value;

        await createOrder(order);
      },
    },
  ]);
};
