import React from 'react';
import { useSelector } from 'react-redux';
import { OperationStatus } from '../../types/OperationStatus';
import { PanelBodyNetworkError } from '../loading-and-errors/PanelBodyNetworkError';
import { PanelBodySpinner } from '../loading-and-errors/PanelBodySpinner';
import { SelectedMonitorEventsDisplay } from '../monitor-events/SelectedMonitorEventsDisplay';
import { getMonitorDetailsLoadingStatus, getSelectedMonitor } from '../monitor/monitorsSlice';
import { MonitorBasicDetails } from './MonitorBasicDetails';

export function MonitorDetailsDisplay() {
    const monitor = useSelector(getSelectedMonitor);
    const loadingStatus = useSelector(getMonitorDetailsLoadingStatus);
    return (
        <>
            {loadingStatus === OperationStatus.Loading && <PanelBodySpinner />}
            {loadingStatus === OperationStatus.Error && <PanelBodyNetworkError />}
            {loadingStatus === OperationStatus.Done && monitor &&
                <>
                    <MonitorBasicDetails monitor={monitor} />
                    <SelectedMonitorEventsDisplay />
                </>
            }
        </>
    )
}

