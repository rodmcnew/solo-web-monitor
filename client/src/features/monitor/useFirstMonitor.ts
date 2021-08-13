import { useGetMonitorsQuery } from "../../api";

//@TODO memoize?
export const useFirstMonitor = () => {
    return useGetMonitorsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            firstMonitor: data?.find(() => true),
        }),
    });
}