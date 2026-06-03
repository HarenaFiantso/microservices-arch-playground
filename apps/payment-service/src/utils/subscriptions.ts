import { consumer } from './kafka.js';
import { createStripeProduct, deleteStripeProduct } from './stripe-product.js';

export const runKafkaSubscriptions = async () => {
  consumer.subscribe([
    {
      topicName: 'product.created',
      topicHandler: async (message) => {
        const product = message.value;
        console.log('Received message: product.created', product);

        await createStripeProduct(product);
      },
    },
    {
      topicName: 'product.deleted',
      topicHandler: async (message) => {
        const productId = message.value;
        console.log('Received message: product.deleted', productId);

        await deleteStripeProduct(productId);
      },
    },
  ]);
};
