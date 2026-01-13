import { migrate, type MigrateConfig } from '@booking/serve-core';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

// Load .env.local from workspace root manually
const envPath = resolve(__dirname, '../../../../.env.local');
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
} catch (error) {
  console.log('==> Warning: Could not load .env.local file');
}

const config: MigrateConfig = {
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  user: process.env.DATABASE_USERNAME || 'vhub_user',
  password: process.env.DATABASE_PASSWORD || 'vhub_password',
  database: process.env.DATABASE_NAME || 'vhub_booking',
  folder: resolve(__dirname, '../../migrations'),
};

migrate(config).then(() => {
  console.log('==> Migration completed successfully');
  process.exit(0);
}).catch((error: Error) => {
  console.error('==> Migration failed:', error);
  process.exit(1);
});
