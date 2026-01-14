import { readFileSync } from "fs";

export function envObject(path: string) {
    try {
        console.log(`==> Loading environment from: ${path}`);
        const envContent = readFileSync(path, 'utf-8');

        // Split by both \n and \r\n to handle different line endings
        const lines = envContent.split(/\r?\n/);

        lines.forEach((line) => {
            // Skip empty lines and comments
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith('#')) {
                return;
            }

            const match = line.match(/^([^=:#]+)=(.*)$/);
            if (match && match[1]) {
                const key = match[1].trim();
                const value = match[2] ? match[2].trim() : '';
                process.env[key] = value;
            }
        });

        return envContent
    } catch (error) {
        console.log('==> Warning: Could not load .env file');
        console.error('==> ', error);
    }
}