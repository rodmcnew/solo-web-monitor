import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useInterval from 'use-interval';
import {MonitorDashboard} from './MonitorDashboard';
import {fetchAllMonitors, getAllMonitors, getDetailsUiMode, getInitialMonitorFetchDone, getSelectedMonitorId, showCreateMonitorForm, showMonitorDetails} from './monitorSlice';

export function MonitorDashboardContainer() {
  const monitors = useSelector(getAllMonitors);
  const dispatch = useDispatch();
  const selectedMonitorId = useSelector(getSelectedMonitorId);
  const detailsUiMode = useSelector(getDetailsUiMode);
  const initialMonitorFetchDone = useSelector(getInitialMonitorFetchDone);

  //@TODO should this kind of logic be here?
  // If no monitor is selected and we are in view mode, select the first one.
  // useEffect(() => {
  //   if (selectedMonitorId === null && detailsUiMode === 'view') {
  //     const firstMonitor = monitors.find(() => true);
  //     if (firstMonitor !== undefined) {
  //       dispatch(showMonitorDetails(firstMonitor.id));
  //     }
  //   }
  // }, [selectedMonitorId, monitors])

  //@TODO should this kind of logic be here?
  //If there are no monitors, show the "create monitor" form.
  useEffect(() => {
    if (initialMonitorFetchDone && monitors.length === 0) {
      dispatch(showCreateMonitorForm());
    }
  }, [monitors])

  useEffect(() => {
    dispatch(fetchAllMonitors())
  }, []);

  useInterval(() => {
    dispatch(fetchAllMonitors())
  }, 10 * 1000)//@TODO interval length and hardcoding?

  return <MonitorDashboard />
}
