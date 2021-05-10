import React from 'react';
import { Monitor, MonitorEventsData } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import { PanelBodyNetworkError } from '../loading-and-errors/PanelBodyNetworkError';
import { PanelBodySpinner } from '../loading-and-errors/PanelBodySpinner';
import { MonitorLatestEvents } from '../monitor-events/MonitorLatestEvents';
import { MonitorPingChart } from '../monitor-events/MonitorPingChart';
import { MonitorBasicDetails } from './MonitorBasicDetails';

interface Props {
    monitor: Monitor | null;
    monitorEventsData: MonitorEventsData;
    loadingStatus: OperationStatus;
}
export function MonitorDetailsDisplay({ monitor, monitorEventsData, loadingStatus }: Props) {
    return (
        <div>
            {loadingStatus === OperationStatus.Loading && <PanelBodySpinner />}
            {loadingStatus === OperationStatus.Error && <PanelBodyNetworkError />}
            {loadingStatus === OperationStatus.Done && monitor &&
                <>
                    <MonitorBasicDetails monitor={monitor} />
                    <>
                        <div className="mt-3">
                            <h4 className="d-inline">Response Time</h4> (ms)
                        </div>
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
                </>
            }
        </div>
    )
}

