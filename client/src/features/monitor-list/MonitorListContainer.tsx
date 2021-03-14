import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMonitor, fetchAllMonitors, getAllMonitors,
  getSelectedMonitorId,
  showCreateMonitorForm, showMonitorDeleteForm, showMonitorDetailsWithRefreshedData, showMonitorEditForm
} from '../monitor/monitorSlice';
import { MonitorList } from './MonitorList';
//@TODO, in this file and others, is [dispatch] needed in useCallback?
export function MonitorListContainer() {

  const monitors = useSelector(getAllMonitors);
  const dispatch = useDispatch();
  const selectedMonitorId = useSelector(getSelectedMonitorId);

  const handleDeleteMonitor = useCallback((monitorId: string) => {
    dispatch(showMonitorDeleteForm(monitorId));
  }, [dispatch]);

  const handleEditMonitor = useCallback((monitorId: string) => {
    dispatch(showMonitorEditForm(monitorId));
  }, [dispatch]);

  const handleSelectMonitor = useCallback((monitorId: string) => {
    dispatch(showMonitorDetailsWithRefreshedData(monitorId));
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
  />
}
