import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMonitorsThenShowMonitorDetailsForAnyMonitor } from '../dashboard/dashboardSlice';
import { MonitorDashboard } from './MonitorDashboard';

export function MonitorDashboardContainer() {
  const dispatch = useDispatch();

  // Trigger initial data fetches from the server
  useEffect(() => {
    dispatch(fetchMonitorsThenShowMonitorDetailsForAnyMonitor());
  }, [dispatch]);

  return <MonitorDashboard />
}
