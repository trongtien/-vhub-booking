import { readFileSync } from "fs";
import { resolve } from "path";


export function envObject(path: string) {
    const envPath = resolve(__dirname, path);
    try {
        const envContent = readFileSync(envPath, 'utf-8');
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=:#]+)=(.*)$/);
            if (match && match[1] && match[2]) {
                const key = match[1].trim();
                const value = match[2].trim();
                process.env[key] = value;
            }
        });

        return envContent
    } catch (error) {
        console.log('==> Warning: Could not load .env.local file');
        console.error('==> ', error);
    }
}