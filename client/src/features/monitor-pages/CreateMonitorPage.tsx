import React, { useCallback } from 'react';
import { useCreateMonitorMutation } from '../../api';
import { NewMonitor } from '../../types';
import { useShowMonitorDetailsForAnyMonitor } from '../monitor/useShowMonitorDetailsForAnyMonitor';
import { MonitorDetailsForm } from '../monitor-details/MonitorDetailsForm';
export const CreateMonitorPage = () => {
    const newMonitorTemplate = { name: '', url: '', interval: 1, status: 's' };
    const [createMonitor, { isLoading, isError }] = useCreateMonitorMutation();
    const showMonitorDetailsForAnyMonitor = useShowMonitorDetailsForAnyMonitor();

    const handleNewMonitorSubmit = useCallback((monitor: NewMonitor) => {
        createMonitor(monitor);
    }, [createMonitor])

    const handleFormCancel = useCallback(() => {
        showMonitorDetailsForAnyMonitor();
    }, [showMonitorDetailsForAnyMonitor])

    return <MonitorDetailsForm<NewMonitor>
        headerText={'Create New Monitor'}
        monitor={newMonitorTemplate}
        onSubmit={handleNewMonitorSubmit}
        onCancel={handleFormCancel}
        isLoading={isLoading}
        isError={isError} />
}