import { API_URL } from "./env";
import { constrain } from "../utils";
import { int } from "../types";

export const BACKEND_ROUTES = constrain({
    some_route: (page: int) => `${API_URL()}/someroute?page=${page}`,
});
