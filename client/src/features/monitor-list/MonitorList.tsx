import React, {useCallback} from 'react';
import {Monitor} from '../../types';
import {MonitorListLine} from './MonitorListLine';

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
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h3 className="panel-title">Monitors</h3>
      </div>
      <div className="panel-body">
        {monitors.length !== 0 &&
          <div>
            <button
              onClick={handleSelectMonitorClick}
              className="btn btn-default btn-sm"
              style={{width: '100%'}}>
              <span className="glyphicon glyphicon-plus" />
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
