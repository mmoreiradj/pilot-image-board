import { z } from 'zod';

export const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string(),

  PG_HOST: z.string(),
  PG_PORT: z.string(),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_DATABASE: z.string(),

  CORS_ORIGIN: z.string().url(),
});

export type Config = z.infer<typeof configSchema>;

export const config = (config: Record<string, unknown>): Config => {
  return configSchema.parse(config);
};
