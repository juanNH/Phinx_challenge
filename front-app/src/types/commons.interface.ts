export interface DataState<T> {
    data: T;
    isLoading: boolean;
    isError: boolean;
}

export type Nullable<T> = T | null;