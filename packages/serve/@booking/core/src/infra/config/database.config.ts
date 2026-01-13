import { z } from "zod";

export const databaseConfigSchema = z.object({
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_POOL_MIN: z.number().int().default(2),
    DATABASE_POOL_MAX: z.number().int().default(10),
    DATABASE_POOL_SSL: z.string().default('false'),
});

export type DatabaseConfig = z.infer<typeof databaseConfigSchema>

export function loadDatabaseConfig(env: NodeJS.ProcessEnv): DatabaseConfig {
  return databaseConfigSchema.parse({
    DATABASE_HOST: env.DATABASE_HOST,
    DATABASE_PORT: Number(env.DATABASE_PORT),
    DATABASE_NAME: env.DATABASE_NAME,
    DATABASE_USERNAME: env.DATABASE_USERNAME,
    DATABASE_PASSWORD: env.DATABASE_PASSWORD,
    DATABASE_POOL_MIN: Number(env.DATABASE_POOL_MIN),
    DATABASE_POOL_MAX: Number(env.DATABASE_POOL_MAX),
    DATABASE_POOL_SSL: env.DATABASE_POOL_SSL,
  });
}

