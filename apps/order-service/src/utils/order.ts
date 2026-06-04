import { Order } from '@kitro/order-db';
import { OrderType } from '@kitro/types';

import { producer } from './kafka.js';

export const createOrder = async (order: OrderType) => {
  console.log('Creating order:', order);

  const newOrder = new Order(order);

  try {
    const savedOrder = await newOrder.save();

    console.log('Saved order:', savedOrder._id);

    await producer.send('order.created', {
      value: {
        email: savedOrder.email,
        amount: savedOrder.amount,
        status: savedOrder.status,
      },
    });
  } catch (error) {
    console.error('Failed to save order:', error);
    throw error;
  }
};
