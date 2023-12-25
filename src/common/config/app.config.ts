import { z } from 'zod';

export const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string(),

  PG_HOST: z.string(),
  PG_PORT: z.string(),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_DATABASE: z.string(),

  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),

  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_ENDPOINT: z.string().url(),
  S3_BUCKET_NAME: z.string(),

  CORS_ORIGIN: z.string().url(),
});

export type Config = z.infer<typeof configSchema>;

export const config = (config: Record<string, unknown>): Config => {
  return configSchema.parse(config);
};
