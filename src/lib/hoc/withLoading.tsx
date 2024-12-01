import LoadingSpinner from "@/components/common/LoadingSpinner";
import {WithLoadingProps} from "@/types/components/hocProps";

export function withLoading<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    { LoadingComponent = LoadingSpinner }: WithLoadingProps = {}
) {
   return function withLoadingComponent(props: P & { isLoading?: boolean }) {
       const { isLoading, ...rest } = props;

       if (isLoading) {
           return <LoadingComponent />;
       }

       return <WrappedComponent {...(rest as P)} />;
   }
}