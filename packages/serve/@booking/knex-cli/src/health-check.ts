import { registerConnection } from "./connection";
import { ConnectionConfig } from "./type";

export async function healthCheck(config: ConnectionConfig) {
    const connection = registerConnection(config);
    try {
        await connection.raw("SELECT 1");
    } catch (error) {
        console.error('==> Check health error', error)
    } finally {
        if (!connection) {
            return
        }
        connection.destroy()
    }
}
