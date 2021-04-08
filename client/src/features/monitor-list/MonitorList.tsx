import React, { useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Monitor } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import { PanelBodyNetworkError } from '../loading-and-errors/PanelBodyNetworkError';
import { PanelBodySpinner } from '../loading-and-errors/PanelBodySpinner';
import { MonitorListLine } from './MonitorListLine';
interface Props {
  monitors: Monitor[];
  onDeleteMonitor: (monitorId: string) => void;
  onEditMonitor: (monitorId: string) => void;
  onSelectMonitor: (monitorId: string) => void;
  onCreateMonitor: () => void;
  selectedMonitorId: string | null;
  loadingStatus: OperationStatus;
}

export function MonitorList({
  monitors, onCreateMonitor, onEditMonitor, onDeleteMonitor, onSelectMonitor, selectedMonitorId, loadingStatus
}: Props) {

  const handleSelectMonitorClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onCreateMonitor()
  }, [onCreateMonitor]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Monitors</h3>
      </div>
      { loadingStatus === OperationStatus.Loading && <PanelBodySpinner />}
      { loadingStatus === OperationStatus.Error && <PanelBodyNetworkError />}
      { loadingStatus === OperationStatus.Done &&
        < div className="card-body">
          {monitors.length !== 0 &&
            <div>
              <button
                onClick={handleSelectMonitorClick}
                className="btn btn-secondary w-100">
                <FaPlus />
          &nbsp;
          Create new monitor
      </button>
              <table className="table table-hover mt-3">
                <tbody>
                  {monitors.map((monitor) =>
                    <MonitorListLine
                      key={monitor.id}
                      monitor={monitor}
                      onDeleteMonitor={onDeleteMonitor}
                      onEditMonitor={onEditMonitor}
                      onSelectMonitor={onSelectMonitor}
                      selectedMonitorId={selectedMonitorId}
                    />
                  )}
                </tbody>
              </table>
            </div>
          }
          {monitors.length === 0 &&
            <div>No monitors found.</div>
          }
        </div>
      }
    </div >
  );
}
