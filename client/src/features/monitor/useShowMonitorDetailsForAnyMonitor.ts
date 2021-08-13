import { useDispatch } from "react-redux";
import { showCreateMonitorForm, showMonitorDetails } from "../dashboard/dashboardSlice";
import { useFirstMonitor } from "./useFirstMonitor";

//@TODO memoize?
export const useShowMonitorDetailsForAnyMonitor = () => {
    const dispatch = useDispatch();
    const { firstMonitor } = useFirstMonitor();
    const showMonitorDetailsForAnyMonitor = () => {
        if (firstMonitor) {
            dispatch(showMonitorDetails(firstMonitor.id))
        } else {
            dispatch(showCreateMonitorForm)
        }
    }
    return showMonitorDetailsForAnyMonitor;
}