import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInterval from 'use-interval';
import { DetailsUiMode, Monitor, NewMonitor } from '../../types';
import {
  createMonitor, deleteMonitor, fetchSelectedMonitorEvents, getAllMonitors,
  getDetailsUiMode,
  getSelectedMonitorEvents, getSelectedMonitorId,
  patchMonitor,
  showMonitorDetails
} from '../monitor/monitorSlice';
import { MonitorDeleteForm } from './MonitorDeleteForm';
import { MonitorDetailsDisplay } from './MonitorDetailsDisplay';
import { MonitorDetailsForm } from './MonitorDetailsForm';

export function MonitorDetailsContainer() {
  const dispatch = useDispatch();
  const detailsUiMode = useSelector(getDetailsUiMode);
  const selectedMonitorId = useSelector(getSelectedMonitorId);
  const monitors = useSelector(getAllMonitors);
  //@TODO move this to the slice file? or at least memoize?
  const selectedMonitor = monitors.find(monitor => monitor.id === selectedMonitorId) || null;
  const newMonitorTemplate = { name: '', url: '', interval: 1, status: 's' };
  const selectedMonitorEvents = useSelector(getSelectedMonitorEvents);

  const handleNewMonitorSubmit = useCallback((monitor: NewMonitor) => {
    dispatch(createMonitor(monitor))
  }, [dispatch])

  const handleMonitorEditSubmit = useCallback((monitor: Monitor | NewMonitor) => {
    //@ts-ignore   //@TODO fix types? maybe use <>?
    dispatch(patchMonitor(monitor));
  }, [dispatch])

  const handleMonitorDeleteSubmit = useCallback((monitorId: string) => {
    dispatch(deleteMonitor(monitorId));
  }, [dispatch])

  const handleFormCancel = useCallback(() => {
    dispatch(showMonitorDetails(selectedMonitorId))
  }, [dispatch, selectedMonitorId])

  return <div>
    {detailsUiMode === DetailsUiMode.View && selectedMonitor !== null &&
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Selected Monitor</h3>
        </div>
        <div className="panel-body">
          <MonitorDetailsDisplay
            monitor={selectedMonitor}
            monitorEvents={selectedMonitorEvents} />
        </div>
      </div>
    }
    {detailsUiMode === DetailsUiMode.Create &&
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Create New Monitor</h3>
        </div>
        <div className="panel-body">
          <MonitorDetailsForm
            monitor={newMonitorTemplate}
            onSubmit={handleNewMonitorSubmit}
            onCancel={handleFormCancel} />
        </div>
      </div>
    }
    {detailsUiMode === DetailsUiMode.Edit && selectedMonitor !== null &&
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Edit Monitor</h3>
        </div>
        <div className="panel-body">
          <MonitorDetailsForm
            monitor={selectedMonitor}
            onSubmit={handleMonitorEditSubmit}
            onCancel={handleFormCancel} />
        </div>
      </div>
    }
    {detailsUiMode === DetailsUiMode.Delete && selectedMonitor !== null &&
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h3 className="panel-title">Delete Monitor?</h3>
        </div>
        <div className="panel-body">
          <MonitorDeleteForm
            monitor={selectedMonitor}
            onDelete={handleMonitorDeleteSubmit}
            onCancel={handleFormCancel} />
        </div>
      </div>
    }
  </div>
}
