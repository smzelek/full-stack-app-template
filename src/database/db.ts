import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { DB_CONNECTION_STRING } from '../service/env';

export const client = postgres(DB_CONNECTION_STRING(), { prepare: false })
export const db = drizzle(client);
