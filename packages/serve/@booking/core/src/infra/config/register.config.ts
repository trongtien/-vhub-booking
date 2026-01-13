import z from "zod";
import { appConfigSchema, loadAppConfig } from "./app.config";
import { databaseConfigSchema, loadDatabaseConfig } from "./database.config";


export const schemaConfig = z.object({
    ...appConfigSchema.shape,
    ...databaseConfigSchema.shape
});

export function registerConfig(env: NodeJS.ProcessEnv) {
    return {
        appConfig: loadAppConfig(env),
        databaseConfig: loadDatabaseConfig(env)
    }
}
