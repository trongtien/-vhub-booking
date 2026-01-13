import { registerAs } from '@nestjs/config'

import {  loadAppConfig, loadDatabaseConfig } from '@booking/serve-core'
import type { AppConfig, DatabaseConfig } from '@booking/serve-core'

const env  = process.env

export const appConfig = registerAs('appConfig', (): AppConfig => loadAppConfig(env))
export const databaseConfig = registerAs('databaseConfig', (): DatabaseConfig => loadDatabaseConfig(env))