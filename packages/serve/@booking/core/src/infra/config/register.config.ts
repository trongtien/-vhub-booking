import z from "zod";
import { appConfigSchema, loadAppConfig } from "./app.config";
import { databaseConfigSchema, loadDatabaseConfig } from "./database.config";


export const schemaConfig = z.object({
    ...appConfigSchema.shape,
    ...databaseConfigSchema.shape
});


export function registerConfig(env: NodeJS.ProcessEnv) {
    const appConfig = loadAppConfig(env);
    const databaseConfig = loadDatabaseConfig(env);

    console.log("==> Registering configuration from environment variables");
    for (const [key, value] of Object.entries(appConfig)) {
        console.log(`  --> App Config:${key}`, value);
    }

    for (const [key, value] of Object.entries(databaseConfig)) {
        console.log(`  --> Database Config:${key}`, value);
    }

    return {
        appConfig,
        databaseConfig,
    }
}
