import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appConfig, databaseConfig } from "./utils/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            envFilePath: ['../../../.env.local', '.env.local'],
            expandVariables: true,
            ignoreEnvFile: false,
            load: [appConfig, databaseConfig],
        }),
    ]
})
export class ConfigEnvModule {

}