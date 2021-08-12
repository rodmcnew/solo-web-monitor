import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteMonitorMutation } from '../../api';
import { DetailsUiMode, Monitor, NewMonitor } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import {
  getSelectedMonitor,
  createMonitorThenShowItsDetails,
  deleteMonitorThenShowDetailsForAnyMonitor,
  getDetailsUiMode,
  patchMonitorThenShowItsDetails,
  showMonitorDetailsForAnyMonitor,
  getMutatingMonitorStatus
} from '../dashboard/dashboardSlice';
import { MonitorDeleteForm } from './MonitorDeleteForm';
import { MonitorDetailsDisplay } from './MonitorDetailsDisplay';
import { MonitorDetailsForm } from './MonitorDetailsForm';

export function MonitorDetailsContainer() {
  const dispatch = useDispatch();
  const detailsUiMode = useSelector(getDetailsUiMode);
  const selectedMonitor = useSelector(getSelectedMonitor);
  const newMonitorTemplate = { name: '', url: '', interval: 1, status: 's' };
  const mutatingMonitorStatus = useSelector(getMutatingMonitorStatus);

  const handleNewMonitorSubmit = useCallback((monitor: NewMonitor) => {
    dispatch(createMonitorThenShowItsDetails(monitor))
  }, [dispatch])

  const handleMonitorEditSubmit = useCallback((monitor: Monitor) => {
    dispatch(patchMonitorThenShowItsDetails(monitor));
  }, [dispatch])

  //@TODO loading spinner
  //@TODO error handling
  const [
    deleteMonitor,
    { status: deleteMonitorMutationStatus }, // @TODO naming?
  ] = useDeleteMonitorMutation()

  //@TODO clean
  const handleMonitorDeleteSubmit = useCallback((monitorId: string) => {
    (async () => {
      //@TODO handle errors and loading spinner
      const result = await deleteMonitor(monitorId);
      //@ts-ignore //@TODO
      if (!result.error) {
        dispatch(showMonitorDetailsForAnyMonitor()); //@TODO find better way?
      }
    })();
  }, [dispatch])

  const handleFormCancel = useCallback(() => {
    dispatch(showMonitorDetailsForAnyMonitor())
  }, [dispatch])

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
    {detailsUiMode === DetailsUiMode.Edit && selectedMonitor !== null &&
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Edit Monitor</h3>
        </div>
        <div className="card-body">
          <MonitorDetailsForm<Monitor>
            monitor={selectedMonitor}
            onSubmit={handleMonitorEditSubmit}
            onCancel={handleFormCancel}
            operationStatus={mutatingMonitorStatus} />
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
            onCancel={handleFormCancel}
            mutationStatus={deleteMonitorMutationStatus} />
        </div>
      </div>
    }
  </div>
}
