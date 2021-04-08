import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MonitorDashboard } from './MonitorDashboard';
import { fetchMonitorsThenShowMonitorDetailsForAnyMonitor } from './monitorsSlice';

export function MonitorDashboardContainer() {
  const dispatch = useDispatch();

  // Trigger initial data fetches from the server
  useEffect(() => {
    dispatch(fetchMonitorsThenShowMonitorDetailsForAnyMonitor());
  }, [dispatch]);

  return <MonitorDashboard />
}
