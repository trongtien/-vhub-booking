import { LoggerAdapter } from "@booking/serve-core";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";


@Module({
    providers: [
        {
            provide: LoggerAdapter,
            useFactory: () => new LoggerAdapter(LoggerAdapter.TERMINAL_LOGGER),
        },
    ],
    exports: [LoggerAdapter],
})
export class LoggerModule {
}