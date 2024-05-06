import { AsyncLocalStorage } from 'node:async_hooks';
export const asyncLocalStorage = new AsyncLocalStorage<{ request_id: string }>();
