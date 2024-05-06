import { randomUUID } from 'node:crypto';
import { int } from '../types';
import { asyncLocalStorage } from './context';

export const nodeUuid = (): string => {
    return randomUUID();
};

export const dbNow = (ms_offset: int = 0) => new Date(new Date(new Date().getTime() + ms_offset).toUTCString());

export const logFunction = (caller: (...args: any[]) => any, message: unknown): void => {
    if (process.env.NODE_TEST_CONTEXT) {
        return;
    }

    const request_id = asyncLocalStorage?.getStore()?.request_id;
    console.log(JSON.stringify({
        tag: 'LOG',
        ...(request_id ? { request_id } : {}),
        fn: caller.name,
        message
    }, (_, v) => v === undefined ? null : v))
};

export const retry = async<T>(fnThatMayError: () => Promise<T>, tries = 1, maxRetries = 3): Promise<T> => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const delayMs = 500;

    try {
        return await fnThatMayError();
    }
    catch (e) {
        logFunction(fnThatMayError, e?.toString())
        if (tries < maxRetries) {
            await delay(delayMs * 2 ** (tries - 1))
            return retry(fnThatMayError, tries + 1);
        }
        throw `Failed after ${maxRetries} retries.`;
    }
}

