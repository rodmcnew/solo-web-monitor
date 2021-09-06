import { useSelector } from "react-redux";
import { useGetMonitorsQuery } from "../../../api";
import { getSelectedMonitorId } from "../monitorsSlice";

export const useSelectedMonitor = () => {
    const selectedMonitorId = useSelector(getSelectedMonitorId);
    return useGetMonitorsQuery(undefined, {
        selectFromResult: ({ data, isLoading, isError }) => ({
            monitor: data?.find((monitor) => monitor.id === selectedMonitorId),
            isLoading,
            isError
        }),
    });
}