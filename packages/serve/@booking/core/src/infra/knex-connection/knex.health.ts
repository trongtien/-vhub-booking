import { ConnectionConfig } from "../../types";
import { registerConnectionKnex } from "./knex.instance";

export async function checkDbHealth(config: ConnectionConfig) {
    const connection = registerConnectionKnex(config);
    try {
    await connection.raw("SELECT 1");
    } catch (error) {
        console.error('==> Check health error', error )
    } finally {
        if(!connection) {
            return
        }
        connection.destroy()
    }
}
