import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllMonitors, getMonitorListLoadingStatus,
} from '../monitor/monitorsSlice';
import { MonitorList } from './MonitorList';
import { getSelectedMonitorId, showCreateMonitorForm, showMonitorDeleteForm, showMonitorDetails, showMonitorEditForm } from '../dashboard/dashboardSlice';
import { useDeleteMonitorMutation, useGetMonitorsQuery } from '../../api';
import { OperationStatus } from '../../types/OperationStatus';

//@TODO remove any old unused code, re-org anything weird
//@TODO ensure loading spinner is connected to new rtk-query stuff
export function MonitorListContainer() {
  //@TODO error handling
  const { data: monitorsData, isLoading: monitorsIsLoading } = useGetMonitorsQuery();
  const monitors = monitorsData || [];

  const dispatch = useDispatch();
  const selectedMonitorId = useSelector(getSelectedMonitorId);
  const monitorListLoadingStatus = monitorsIsLoading ? OperationStatus.Loading : OperationStatus.Done; //TODO improve?

  const handleDeleteMonitor = useCallback((monitorId: string) => {
    dispatch(showMonitorDeleteForm(monitorId));
  }, [dispatch]);

  const handleEditMonitor = useCallback((monitorId: string) => {
    dispatch(showMonitorEditForm(monitorId));
  }, [dispatch]);

  const handleSelectMonitor = useCallback((monitorId: string) => {
    dispatch(showMonitorDetails(monitorId));
  }, [dispatch]);

  const handleCreateMonitorClick = useCallback(() => {
    dispatch(showCreateMonitorForm());
  }, [dispatch]);

  return <MonitorList
    monitors={monitors}
    onDeleteMonitor={handleDeleteMonitor}
    onEditMonitor={handleEditMonitor}
    onSelectMonitor={handleSelectMonitor}
    onCreateMonitor={handleCreateMonitorClick}
    selectedMonitorId={selectedMonitorId}
    loadingStatus={monitorListLoadingStatus}
  />
}
