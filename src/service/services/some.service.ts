import { SomeApiResponse } from "../../types";
import { Result } from "../types";

export class SomeAPI {
    static loadSomething = async (): Promise<Result<SomeApiResponse>> => {
        return { error: null, result: [] };
    };
}
