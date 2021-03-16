import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInterval from 'use-interval';
import { DetailsUiMode } from '../../types';
import { getDetailsUiMode, getSelectedMonitorId, showCreateMonitorForm, showMonitorDetails } from '../monitor-details/monitorDetailsSlice';
import { MonitorDashboard } from './MonitorDashboard';
import {
  fetchAllDisplayedMonitorData, getAllMonitors,
  getinitialMonitorsFetchDone,
} from './monitorsSlice';

/**
 * How often the client re-fetches the displayed data from the server
 */
const DATA_REFRESH_INTERVAL_MS = 60 * 1000;

export function MonitorDashboardContainer() {
  const monitors = useSelector(getAllMonitors);
  const dispatch = useDispatch();
  const initialMonitorsFetchDone = useSelector(getinitialMonitorsFetchDone);
  const detailsUiMode = useSelector(getDetailsUiMode);
  const selectedMonitorId = useSelector(getSelectedMonitorId);

  // Trigger initial data fetches from the server
  useEffect(() => {
    dispatch(fetchAllDisplayedMonitorData())
  }, []);

  // Setup an intervale to refresh the data on the screen every so often
  useInterval(() => {
    dispatch(fetchAllDisplayedMonitorData())
  }, DATA_REFRESH_INTERVAL_MS)

  /**
   * If there are no monitors, show the "create monitor" form.
   * 
   * @possibleImprovement: Its arguable if this should be here or if it should be in the
   * reducer.
   */
  useEffect(() => {
    if (initialMonitorsFetchDone && monitors.length === 0) {
      dispatch(showCreateMonitorForm());
    }
  }, [initialMonitorsFetchDone, monitors])

  /**
   * If we are in view monitor mode and no monitor is selected, select the first one.
   * 
   * @possibleImprovement: Its arguable if this should be here or if it should be in the
   * reducer.
   */
  useEffect(() => {
    if (detailsUiMode === DetailsUiMode.View && selectedMonitorId === null) {
      const firstMonitor = monitors.find(() => true);
      if (firstMonitor !== undefined) {
        dispatch(showMonitorDetails(firstMonitor.id));
      }
    }
  }, [detailsUiMode, selectedMonitorId, monitors, dispatch]);

  return <MonitorDashboard />
}
