import { useQuery } from "@tanstack/react-query";
import { ApiSuccessResponse, ApiErrorResponse, int, SomeApiResponse } from "../../types";
import { BACKEND_ROUTES } from "../routes";

export const SOME_QUERY_KEY = 'somequery';
export const loadSomething = (page: int) => useQuery<SomeApiResponse, string, SomeApiResponse>({
    queryKey: [SOME_QUERY_KEY, page],
    queryFn: async () => {
        try {
            const auth: any = null;
            if (!auth) {
                return [];
            }
            const res = await fetch(BACKEND_ROUTES.some_route(page), {
                headers: {
                    'Authorization': `Bearer ${auth?.token}`,
                }
            });
            if (!res.ok) {
                if (res.status < 500) {
                    const err: ApiErrorResponse = await res.json();
                    throw err.error;
                }
                throw '';
            }
            const json: ApiSuccessResponse<SomeApiResponse> = await res.json();
            return json.data;
        }
        catch (e) {
            throw 'Failed to load thing.';
        }
    },
    staleTime: 60,
    refetchOnMount: false,
});
