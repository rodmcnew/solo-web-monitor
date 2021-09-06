import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateMonitorMutation } from '../../../api';
import { Monitor } from '../../../types';
import { showMonitorDetails } from "../monitorsSlice";
import { MonitorDetailsForm } from './MonitorDetailsForm';

interface Props {
    monitor: Monitor
}

export const EditMonitorPage = ({ monitor }: Props) => {
    const [updateMonitor, { isLoading, isError }] = useUpdateMonitorMutation();
    const dispatch = useDispatch();

    const handleMonitorEditSubmit = useCallback((monitor: Monitor) => {
        updateMonitor(monitor);
    }, [updateMonitor])

    const handleFormCancel = useCallback(() => {
        dispatch(showMonitorDetails(monitor.id));
    }, [dispatch, monitor])

    return <MonitorDetailsForm<Monitor>
        headerText={'Edit Monitor'}
        monitor={monitor}
        onSubmit={handleMonitorEditSubmit}
        onCancel={handleFormCancel}
        isLoading={isLoading}
        isError={isError} />
}