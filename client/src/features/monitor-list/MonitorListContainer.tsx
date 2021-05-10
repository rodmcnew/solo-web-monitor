import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllMonitors, getMonitorListLoadingStatus,
} from '../monitor/monitorsSlice';
import { MonitorList } from './MonitorList';
import { getSelectedMonitorId, showCreateMonitorForm, showMonitorDeleteForm, showMonitorDetails, showMonitorEditForm } from '../dashboard/dashboardSlice';

export function MonitorListContainer() {

  const monitors = useSelector(getAllMonitors);
  const dispatch = useDispatch();
  const selectedMonitorId = useSelector(getSelectedMonitorId);
  const monitorListLoadingStatus = useSelector(getMonitorListLoadingStatus)

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
