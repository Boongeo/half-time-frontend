export interface WithAuthProps {
    requireAuth?: boolean;
    requireUnauth?: boolean;
    requireRegistration?: boolean;
}

export interface WithLoadingProps {
    isLoading?: boolean;
    LoadingComponent?: React.ComponentType;
}