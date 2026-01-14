import { Module } from "@nestjs/common";
import { APP_DATABASE_CONNECTION } from "./utils/symbol-provider";
import { ConfigService } from "@nestjs/config";
import { LoggerAdapter } from "@booking/serve-core";
import { registerConnection } from "@booking/serve-knex-cli";
import { LoggerModule } from "./logger.module";
import { ConfigEnvModule } from "./config.module";

@Module({
    imports: [LoggerModule, ConfigEnvModule],
    providers: [
        {
            provide: APP_DATABASE_CONNECTION,
            inject: [ConfigService, LoggerAdapter],
            useFactory: (config: ConfigService, logger: LoggerAdapter) => registerConnection({
                database: config.get<string>('databaseConfig.database'),
                host: config.get<string>('databaseConfig.host'),
                port: config.get<number>('databaseConfig.port'),
                user: config.get<string>('databaseConfig.user'),
                password: config.get<string>('databaseConfig.password'),
            }, logger),
        }
    ],
    exports: [APP_DATABASE_CONNECTION],
})
export class DatabaseModule { }