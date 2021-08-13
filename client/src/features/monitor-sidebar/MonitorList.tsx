import React, { useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMonitorsQuery } from '../../api';
import { getSelectedMonitorId, showCreateMonitorForm, showMonitorDeleteForm, showMonitorDetails, showMonitorEditForm } from '../dashboard/dashboardSlice';
import { PanelBodyNetworkError } from '../loading-and-errors/PanelBodyNetworkError';
import { PanelBodySpinner } from '../loading-and-errors/PanelBodySpinner';
import { MonitorListLine } from './MonitorListLine';

//@TODO remove any old unused code, re-org anything weird
//@TODO ensure loading spinner is connected to new rtk-query stuff
export function MonitorList() {

  const { data, isLoading, isError } = useGetMonitorsQuery();
  const monitors = data || [];

  const dispatch = useDispatch();
  const selectedMonitorId = useSelector(getSelectedMonitorId);

  const handleDeleteMonitor = useCallback((monitorId: string) => {
    dispatch(showMonitorDeleteForm(monitorId));
  }, [dispatch]);

  const handleEditMonitor = useCallback((monitorId: string) => {
    dispatch(showMonitorEditForm(monitorId));
  }, [dispatch]);

  const handleSelectMonitor = useCallback((monitorId: string) => {
    dispatch(showMonitorDetails(monitorId));
  }, [dispatch]);

  const handleCreateMonitorClick = useCallback(() => {
    dispatch(showCreateMonitorForm());
  }, [dispatch]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Monitors</h3>
      </div>
      {isLoading && <PanelBodySpinner />}
      {isError && <PanelBodyNetworkError />}
      {!isLoading &&
        <div className="card-body">
          <button
            onClick={handleCreateMonitorClick}
            className="btn btn-secondary w-100">
            <FaPlus />
            &nbsp;
            Create new monitor
          </button>
          {monitors.length !== 0 &&
            <div>
              <table className="table table-hover mt-3">
                <tbody>
                  {monitors.map((monitor) =>
                    <MonitorListLine
                      key={monitor.id}
                      monitor={monitor}
                      onDeleteMonitor={handleDeleteMonitor}
                      onEditMonitor={handleEditMonitor}
                      onSelectMonitor={handleSelectMonitor}
                      selectedMonitorId={selectedMonitorId}
                    />
                  )}
                </tbody>
              </table>
            </div>
          }
        </div>
      }
    </div >
  );
}
