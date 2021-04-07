import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsUiMode, Monitor, NewMonitor } from '../../types';
import {
  createMonitorThenShowItsDetails, deleteMonitorThenShowDetailsForAnyMonitor, getAllMonitors,
  patchMonitor,
} from '../monitor/monitorsSlice';
import { getAllMonitorEvents, getDetailsUiMode, getSelectedMonitorId, showMonitorDetailsForAnyMonitor } from './monitorDetailsSlice';
import { MonitorDeleteForm } from './MonitorDeleteForm';
import { MonitorDetailsDisplay } from './MonitorDetailsDisplay';
import { MonitorDetailsForm } from './MonitorDetailsForm';
import { Spinner } from 'react-bootstrap';

export function MonitorDetailsContainer() {
  const dispatch = useDispatch();
  const detailsUiMode = useSelector(getDetailsUiMode);
  const selectedMonitorId = useSelector(getSelectedMonitorId);
  const monitors = useSelector(getAllMonitors);
  //@TODO move this to the slice file? or at least memoize?
  const selectedMonitor = monitors.find(monitor => monitor.id === selectedMonitorId) || null;
  const newMonitorTemplate = { name: '', url: '', interval: 1, status: 's' };
  const selectedMonitorEvents = useSelector(getAllMonitorEvents);

  const handleNewMonitorSubmit = useCallback((monitor: NewMonitor) => {
    dispatch(createMonitorThenShowItsDetails(monitor))
  }, [dispatch])

  const handleMonitorEditSubmit = useCallback((monitor: Monitor) => {
    dispatch(patchMonitor(monitor));
  }, [dispatch])

  const handleMonitorDeleteSubmit = useCallback((monitorId: string) => {
    dispatch(deleteMonitorThenShowDetailsForAnyMonitor(monitorId));
  }, [dispatch])

  const handleFormCancel = useCallback(() => {
    dispatch(showMonitorDetailsForAnyMonitor())
  }, [dispatch])

  return <div>
    {detailsUiMode === DetailsUiMode.View && selectedMonitor !== null &&
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Selected Monitor</h3>
        </div>
        <div className="card-body">
          <MonitorDetailsDisplay
            monitor={selectedMonitor}
            monitorEvents={selectedMonitorEvents} />
        </div>
      </div>
    }
    {detailsUiMode === DetailsUiMode.Create &&
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Create New Monitor</h3>
        </div>
        <div className="card-body">
          <MonitorDetailsForm<NewMonitor>
            monitor={newMonitorTemplate}
            onSubmit={handleNewMonitorSubmit}
            onCancel={handleFormCancel} />
        </div>
      </div>
    }
    {detailsUiMode === DetailsUiMode.Edit && selectedMonitor !== null &&
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Edit Monitor</h3>
        </div>
        <div className="card-body">
          <MonitorDetailsForm<Monitor>
            monitor={selectedMonitor}
            onSubmit={handleMonitorEditSubmit}
            onCancel={handleFormCancel} />
        </div>
      </div>
    }
    {detailsUiMode === DetailsUiMode.Delete && selectedMonitor !== null &&
      <div className="card card-danger">
        <div className="card-header">
          <h3 className="card-title">Delete Monitor?</h3>
        </div>
        <div className="card-body">
          <MonitorDeleteForm
            monitor={selectedMonitor}
            onDelete={handleMonitorDeleteSubmit}
            onCancel={handleFormCancel} />
        </div>
      </div>
    }
  </div>
}
