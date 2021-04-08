import React from 'react';
import { Monitor, MonitorEvent } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import { PanelBodyNetworkError } from '../loading-and-errors/PanelBodyNetworkError';
import { PanelBodySpinner } from '../loading-and-errors/PanelBodySpinner';
import { MonitorLatestEvents } from '../monitor-events/MonitorLatestEvents';
import { MonitorPingChart } from '../monitor-events/MonitorPingChart';
import { MonitorBasicDetails } from './MonitorBasicDetails';

interface Props {
    monitor: Monitor | null;
    monitorEvents: MonitorEvent[];
    loadingStatus: OperationStatus;
}
export function MonitorDetailsDisplay({ monitor, monitorEvents, loadingStatus }: Props) {
    return (
        <div>
            {loadingStatus === OperationStatus.Loading && <PanelBodySpinner />}
            {loadingStatus === OperationStatus.Error && <PanelBodyNetworkError />}
            {loadingStatus === OperationStatus.Done && monitor &&
                <>
                    <MonitorBasicDetails monitor={monitor} />
                    <div className="mt-3">
                        <h4 className="d-inline">Response Time</h4> (ms)
                    </div>
                    <MonitorPingChart monitorEvents={monitorEvents} />
                    <h4 className="mt-3">Latest Events</h4>
                    <MonitorLatestEvents monitorEvents={monitorEvents} maxEventCount={10} />
                </>
            }
        </div>
    )
}

