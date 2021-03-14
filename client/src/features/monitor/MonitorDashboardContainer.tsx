import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInterval from 'use-interval';
import { MonitorDashboard } from './MonitorDashboard';
import {
  fetchAllDisplayedMonitorData, getAllMonitors,
  getInitialMonitorFetchDone, showCreateMonitorForm,
} from './monitorSlice';

/**
 * How often the client re-fetches the displayed data from the server
 */
const DATA_REFRESH_INTERVAL_MS = 60 * 1000;

export function MonitorDashboardContainer() {
  const monitors = useSelector(getAllMonitors);
  const dispatch = useDispatch();
  const initialMonitorFetchDone = useSelector(getInitialMonitorFetchDone);

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
   * reducer. It seems less complicated here though.
   */
  useEffect(() => {
    if (initialMonitorFetchDone && monitors.length === 0) {
      dispatch(showCreateMonitorForm());
    }
  }, [initialMonitorFetchDone, monitors])

  return <MonitorDashboard />
}
