import { z } from "zod";

export const appConfigSchema = z.object({
    APP_NODE_ENV: z.enum(["local", "dev", "prod"]),
    APP_HOST: z.string(),
    APP_PORT: z.string(),
    APP_VERSION: z.string().default("v1"),
    APP_TIMEZONE: z.string().default("UTC"),
});

export type AppConfig = z.infer<typeof appConfigSchema>;

export function loadAppConfig(env: NodeJS.ProcessEnv): AppConfig {
    return appConfigSchema.parse({
        APP_NODE_ENV: env.NODE_ENV,
        APP_HOST: env.APP_HOST,
        APP_PORT: Number(env.APP_PORT),
        APP_VERSION: env.APP_VERSION,
        APP_TIMEZONE: env.APP_TIMEZONE,
    });
}
