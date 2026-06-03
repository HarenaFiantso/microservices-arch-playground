import { createConsumer, createKafkaClient, createProducer } from '@kitro/kafka';

const kafkaClient = createKafkaClient('payment-service');

export const producer = createProducer(kafkaClient);
export const consumer = createConsumer(kafkaClient, 'payment-group');
