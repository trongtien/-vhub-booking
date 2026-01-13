import type { MigrateConfig } from "./type";

export async function validateConfig(config: Partial<MigrateConfig>) {
    const { host, port, user, password, database, folder } = config;
    const errorValid = new Map<string, string>();

    if (host?.length === 0) {
        console.log("===> Config host current", host);
        errorValid.set("host", "Host required");
    }

    if (typeof port !== "number" || port?.toString()?.length === 0) {
        console.log("===> Config port current", port);
        errorValid.set("port", "Port required");
    }

    if (user?.length === 0) {
        console.log("===> Config user current", user);
        errorValid.set("user", "User required");
    }

    if (password?.length === 0) {
        console.log("===> Config password current", password);
        errorValid.set("password", "Password required");
    }

    if (database?.length === 0) {
        console.log("===> Config database current", database);
        errorValid.set("database", "database required");
    }

    if (folder?.length === 0) {
        console.log("===> Config folder current", folder);
        errorValid.set("folder", "folder required");
    }

    if (errorValid?.size > 0) {
        console.error("==> Migrate error validate config");
        console.error("===> ", JSON.stringify(errorValid));
        process.exit(1);
    }
}
