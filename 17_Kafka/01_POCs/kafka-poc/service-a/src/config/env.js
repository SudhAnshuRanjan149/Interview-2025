import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  SERVICE_PORT: z.string().transform(Number),
  KAFKA_BROKERS: z.string(),
  KAFKA_CLIENT_ID: z.string(),
  KAFKA_GROUP_ID: z.string(),
});

export const config = envSchema.parse(process.env);
