import { PlusIcon } from '@primer/octicons-react';
import React, { useCallback } from 'react';
import { Spinner } from 'react-bootstrap';
import { Monitor } from '../../types';
import { MonitorListLine } from './MonitorListLine';

interface Props {
  monitors: Monitor[];
  onDeleteMonitor: (monitorId: string) => void;
  onEditMonitor: (monitorId: string) => void;
  onSelectMonitor: (monitorId: string) => void;
  onCreateMonitor: () => void;
  selectedMonitorId: string | null;
}

export function MonitorList({
  monitors, onCreateMonitor, onEditMonitor, onDeleteMonitor, onSelectMonitor, selectedMonitorId
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
      <div className="card-body">
        {/* <Spinner animation="border" role="status"> //@TODO
          <span className="sr-only">Loading...</span>
        </Spinner> */}
        {monitors.length !== 0 &&
          <div>
            <button
              onClick={handleSelectMonitorClick}
              className="btn btn-secondary btn-sm w-100">
              <PlusIcon />
            &nbsp;
            Create new monitor
        </button>
            <br /><br />
            <table className="table table-hover">
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
    </div>
  );
}
