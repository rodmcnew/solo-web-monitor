import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateMonitorMutation, useUpdateMonitorMutation } from '../../api';
import { DetailsUiMode, Monitor, NewMonitor } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import { getDetailsUiMode } from '../dashboard/dashboardSlice';
import { useSelectedMonitor } from '../monitor/useSelectedMonitor';
import { MonitorDeleteForm } from './MonitorDeleteForm';
import { MonitorDetailsDisplay } from './MonitorDetailsDisplay';
import { MonitorDetailsForm } from './MonitorDetailsForm';

export function MonitorDetailsContainer() {
  const dispatch = useDispatch();
  const detailsUiMode = useSelector(getDetailsUiMode);
  const { monitor } = useSelectedMonitor();
  const newMonitorTemplate = { name: '', url: '', interval: 1, status: 's' };

  const [updateMonitor] = useUpdateMonitorMutation(); //@TODO loading and error handling
  const [createMonitor] = useCreateMonitorMutation(); //@TODO loading and error handling

  const handleNewMonitorSubmit = useCallback((monitor: NewMonitor) => {
    // dispatch(createMonitorThenShowItsDetails(monitor))
    createMonitor(monitor);
  }, [dispatch, createMonitor])

  const handleMonitorEditSubmit = useCallback((monitor: Monitor) => {
    // dispatch(patchMonitorThenShowItsDetails(monitor));
    updateMonitor(monitor);
  }, [dispatch, updateMonitor])

  const handleFormCancel = useCallback(() => {
    //@TODO
    // dispatch(showMonitorDetailsForAnyMonitor())
  }, [dispatch])

  const mutatingMonitorStatus = OperationStatus.Done; //@TODO remove this hack and deal with the problem

  return <div>
    {detailsUiMode === DetailsUiMode.View &&
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Selected Monitor</h3>
        </div>
        <div className="card-body">
          <MonitorDetailsDisplay />
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
            onCancel={handleFormCancel}
            operationStatus={mutatingMonitorStatus} />
        </div>
      </div>
    }
    {detailsUiMode === DetailsUiMode.Edit && monitor &&
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Edit Monitor</h3>
        </div>
        <div className="card-body">
          <MonitorDetailsForm<Monitor>
            monitor={monitor}
            onSubmit={handleMonitorEditSubmit}
            onCancel={handleFormCancel}
            operationStatus={mutatingMonitorStatus} />
        </div>
      </div>
    }
    {detailsUiMode === DetailsUiMode.Delete && monitor !== null &&
      <div className="card card-danger">
        <div className="card-header">
          <h3 className="card-title">Delete Monitor?</h3>
        </div>
        <div className="card-body">
          <MonitorDeleteForm />
        </div>
      </div>
    }
  </div>
}
