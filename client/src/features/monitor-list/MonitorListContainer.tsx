import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteMonitor, fetchAllMonitors, getAllMonitors,
  getDetailsUiMode, getGelectedMonitorId,
  showCreateMonitorForm, showMonitorDetails, showMonitorEditForm
} from '../monitor/monitorSlice';
import {MonitorList} from './MonitorList';
//@TODO, in this file and others, is [dispatch] needed in useCallback?
export function MonitorListContainer() {

  const monitors = useSelector(getAllMonitors);
  const dispatch = useDispatch();
  const selectedMonitorId = useSelector(getGelectedMonitorId);
  const detailsUiMode = useSelector(getDetailsUiMode);

  useEffect(() => {
    dispatch(fetchAllMonitors())
  }, []);

  //@TODO should this kind of logic be here?
  // If no monitor is selected and we are in view mode, select the first one.
  useEffect(() => {
    if (selectedMonitorId === null && detailsUiMode === 'view') {
      const firstMonitor = monitors.find(() => true);
      if (firstMonitor !== undefined) {
        dispatch(showMonitorDetails(firstMonitor.id));
      }
    }
  }, [selectedMonitorId, monitors])

  const handleDeleteMonitor = useCallback((monitorId: string) => {
    dispatch(deleteMonitor(monitorId));
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
  />
}
