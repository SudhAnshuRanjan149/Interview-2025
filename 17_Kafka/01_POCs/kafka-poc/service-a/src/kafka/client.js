import { Kafka, logLevel } from 'kafkajs';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const kafka = new Kafka({
  clientId: config.KAFKA_CLIENT_ID,
  brokers: config.KAFKA_BROKERS.split(','),
  connectionTimeout: 10000,
  requestTimeout: 30000,
  retry: {
    initialRetryTime: 300,
    retries: 8
  },
  logLevel: logLevel.ERROR,
  logCreator: () => ({ namespace, level, log }) => {
    const { message, ...extra } = log;
    if (level >= logLevel.WARN) {
      logger.info(message, { namespace, level, ...extra });
    }
  }
});
