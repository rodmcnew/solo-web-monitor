import { useSelector } from "react-redux";
import { useGetMonitorsQuery } from "../../api";
import { getSelectedMonitorId } from "../dashboard/dashboardSlice";

//@TODO memoize?
//@TODO what about loading spinners and error handling?
//@TODO does this make sense?
export const useSelectedMonitor = () => {
    const selectedMonitorId = useSelector(getSelectedMonitorId);
    return useGetMonitorsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            monitor: data?.find((monitor) => monitor.id === selectedMonitorId),
        }),
    });
}