export type Result<T> = {
    error: string;
    result: null;
} | {
    error: null;
    result: T;
};
