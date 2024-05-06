import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';

(() => {
    const env_vars = dotenv.parse(process.env.AWS_SECRETS_STRING || readFileSync(path.join(__dirname, "../../.env")).toString());
    dotenv.populate(process.env as any, env_vars);
})();

export const DB_CONNECTION_STRING = () => process.env.DB_CONNECTION_STRING!;

export const FRONTEND_URL = () => process.env.FRONTEND_URL!;
export const API_URL = () => process.env.API_URL!;

export const JWT_SECRET = () => process.env.JWT_SECRET!;
