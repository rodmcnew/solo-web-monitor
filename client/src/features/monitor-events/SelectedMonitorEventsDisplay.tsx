import React from 'react';
import { useSelector } from 'react-redux';
import { OperationStatus } from '../../types/OperationStatus';
import { PanelBodyNetworkError } from '../loading-and-errors/PanelBodyNetworkError';
import { PanelBodySpinner } from '../loading-and-errors/PanelBodySpinner';
import { MonitorLatestEvents } from '../monitor-events/MonitorLatestEvents';
import { MonitorPingChart } from '../monitor-events/MonitorPingChart';
import { getSelectedMonitor } from '../monitor/monitorsSlice';
import { getSelectedMonitorEventsData } from './monitorEventsSlice';

export function SelectedMonitorEventsDisplay() {
    const monitor = useSelector(getSelectedMonitor);
    const monitorEventsData = useSelector(getSelectedMonitorEventsData);
    return (
        <>
            <div className="mt-3"><h4 className="d-inline">Response Time</h4> (ms)</div>
            {monitorEventsData.loadingStatus === OperationStatus.Loading && <PanelBodySpinner />}
            {monitorEventsData.loadingStatus === OperationStatus.Error && <PanelBodyNetworkError />}
            {monitorEventsData.loadingStatus === OperationStatus.Done && monitor &&
                <MonitorPingChart monitorEvents={monitorEventsData.events} />
            }
            <h4 className="mt-3">Latest Events</h4>
            {monitorEventsData.loadingStatus === OperationStatus.Loading && <PanelBodySpinner />}
            {monitorEventsData.loadingStatus === OperationStatus.Error && <PanelBodyNetworkError />}
            {monitorEventsData.loadingStatus === OperationStatus.Done && monitor &&
                <MonitorLatestEvents monitorEvents={monitorEventsData.events} maxEventCount={10} />
            }
        </>
    )
}

