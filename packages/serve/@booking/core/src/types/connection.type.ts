export type ConnectionConfig = {
    host: string
    port: string | number
    database: string
    user: string
    password: string
    ssl: 'true' | 'false'
    tableNameMigration?: string
    minPool?: number
    maxPool?: number
}
