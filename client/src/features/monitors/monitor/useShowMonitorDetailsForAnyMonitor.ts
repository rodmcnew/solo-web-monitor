import { useDispatch } from "react-redux";
import { showCreateMonitorForm, showMonitorDetails } from "../monitorsSlice";
import { useFirstMonitor } from "./useFirstMonitor";

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