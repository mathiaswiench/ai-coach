import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

if (!databaseUrl && process.env.NEXT_USER_AUTHENTICATION) {
  throw new Error('VITE_DATABASE_URL is not defined');
}

const sql = neon(databaseUrl);
export const db = drizzle(sql);
