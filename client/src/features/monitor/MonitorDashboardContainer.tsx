import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useInterval from 'use-interval';
import {
  fetchMonitorsThenShowMonitorDetailsForAnyMonitor,
} from '../monitor-details/monitorDetailsSlice';
import { MonitorDashboard } from './MonitorDashboard';

/**
 * How often the client re-fetches the displayed data from the server
 */
const DATA_REFRESH_INTERVAL_MS = 60 * 1000;

export function MonitorDashboardContainer() {
  const dispatch = useDispatch();

  // Trigger initial data fetches from the server
  useEffect(() => {
    dispatch(fetchMonitorsThenShowMonitorDetailsForAnyMonitor());
  }, [dispatch]);

  // Setup an intervale to refresh the data on the screen every so often
  useInterval(() => {
    dispatch(fetchMonitorsThenShowMonitorDetailsForAnyMonitor());
  }, DATA_REFRESH_INTERVAL_MS)

  return <MonitorDashboard />
}
