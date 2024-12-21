import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const databaseUrl = import.meta.env.VITE_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('VITE_DATABASE_URL is not defined');
}

const sql = neon(databaseUrl);
export const db = drizzle(sql);
