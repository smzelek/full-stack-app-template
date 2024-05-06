export type float = number;
export type int = number;
export type dash_case_string = string;
export type formatted_string = string;
export type milliseconds_since_epoch_timestamp = int;
export type guid = string;
export type iso_date_string = string;

export interface ApiErrorResponse extends ApiResponse {
    error: string | object;
};

export interface ApiSuccessResponse<T extends string | object> extends ApiResponse {
    data: T;
};

export interface ApiResponse {
    meta: {
        status: int;
        count?: int;
        version: string;
    };
}

export type SomeApiResponse = any;
