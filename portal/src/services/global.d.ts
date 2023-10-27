export type InitialStateType = {
    [key: string];
};


export type GlobErrorDetailType = {
    code?: string;
    message?: string;
    data?: Record<string, any>;
}

export type GlobErrorType = {
    error: GlobErrorDetailType
}
