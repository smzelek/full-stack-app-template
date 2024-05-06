export const constrain = <T extends Record<string, (...args: any[]) => string>>(t: T): T => {
    return t;
}
