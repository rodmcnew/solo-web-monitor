import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import { useGetMonitorEventsByMonitorIdQuery } from '../../api';
import { PanelBodyNetworkError } from '../loading-and-errors/PanelBodyNetworkError';
import { PanelBodySpinner } from '../loading-and-errors/PanelBodySpinner';
import { MonitorLatestEvents } from '../monitor-events/MonitorLatestEvents';
import { MonitorPingChart } from '../monitor-events/MonitorPingChart';
import { useSelectedMonitor } from '../monitor/useSelectedMonitor';

export function SelectedMonitorEventsDisplay() {
    const { monitor } = useSelectedMonitor();
    const { data, status } = useGetMonitorEventsByMonitorIdQuery(monitor?.id || '');//@TODO deprecated status and || ''
    return (
        <>
            <div className="mt-3"><h4 className="d-inline">Response Time</h4> (ms)</div>
            {status === QueryStatus.pending && <PanelBodySpinner />}
            {status === QueryStatus.rejected && <PanelBodyNetworkError />}
            {status !== QueryStatus.pending && data &&
                <MonitorPingChart monitorEvents={data} />
            }
            <h4 className="mt-3">Latest Events</h4>
            {status === QueryStatus.pending && <PanelBodySpinner />}
            {status === QueryStatus.rejected && <PanelBodyNetworkError />}
            {status !== QueryStatus.pending && data &&
                <MonitorLatestEvents monitorEvents={data} maxEventCount={10} />
            }
        </>
    )
}

