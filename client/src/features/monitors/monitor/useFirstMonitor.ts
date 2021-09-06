import { useGetMonitorsQuery } from "../../../api";

export const useFirstMonitor = () => {
    return useGetMonitorsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            firstMonitor: data?.find(() => true),
        }),
    });
}