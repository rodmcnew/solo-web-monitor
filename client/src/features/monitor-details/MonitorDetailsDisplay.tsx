import React from 'react';
import { SelectedMonitorEventsDisplay } from '../monitor-events/SelectedMonitorEventsDisplay';
import { useSelectedMonitor } from '../monitor/useSelectedMonitor';
import { MonitorBasicDetails } from './MonitorBasicDetails';

export function MonitorDetailsDisplay() {
    const { monitor } = useSelectedMonitor();
    // const loadingStatus = useSelector(getMonitorDetailsLoadingStatus);
    // @TODO deal with commented out
    return (
        <>
            {/* {loadingStatus === OperationStatus.Loading && <PanelBodySpinner />}
            {loadingStatus === OperationStatus.Error && <PanelBodyNetworkError />}
            {loadingStatus === OperationStatus.Done &&  */}
            {monitor &&
                <>
                    <MonitorBasicDetails monitor={monitor} />
                    <SelectedMonitorEventsDisplay />
                </>
            }
        </>
    )
}
