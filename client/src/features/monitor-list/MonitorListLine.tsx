import React, {useCallback} from 'react';
import {Monitor} from '../../types';
import {MonitorStatus} from '../../types/MonitorStatus';

interface Props {
  monitor: Monitor;
  onDeleteMonitor: (monitorId: string) => void;
  onSelectMonitor: (monitorId: string) => void;
  onEditMonitor: (monitorId: string) => void;
  selectedMonitorId: string | null,
}

export function MonitorListLine({
  monitor, onDeleteMonitor, onEditMonitor, onSelectMonitor, selectedMonitorId
}: Props) {

  const handleDeleteMonitorClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (window.confirm('Delete Monitor "' + monitor.name + '"?')) {
      onDeleteMonitor(monitor.id);
    }
  }, [onDeleteMonitor]);

  const handleSelectMonitorClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onSelectMonitor(monitor.id)
  }, [onSelectMonitor]);

  const handleEditMonitorClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onEditMonitor(monitor.id)
  }, [onEditMonitor]);

  return (
    <tr
      onClick={handleSelectMonitorClick}
      style={{cursor: 'pointer'}}
      className={monitor.id === selectedMonitorId ? 'active' : ''}
    >
      <td>
        {monitor.status === MonitorStatus.Up &&
          <span className="text-success glyphicon glyphicon-ok"
            title="Status: Up" />
        }
        {monitor.status === MonitorStatus.Down &&
          <span className="text-danger glyphicon glyphicon-remove"
            title="Status: Down" />
        }
        {monitor.status === MonitorStatus.Starting &&
          <span className="text-primary glyphicon glyphicon-question-sign"
            title="Status: Starting" />
        }
        &nbsp;&nbsp;
        <span>{monitor.name}</span>
        <button onClick={handleDeleteMonitorClick}
          style={{float: 'right'}}
          className="btn btn-default btn-xs">
          <span className="glyphicon glyphicon-trash" title="Delete" />
        </button>
        <span style={{float: 'right'}}>&nbsp;</span>
        <button onClick={handleEditMonitorClick} style={{float: 'right'}}
          className="btn btn-default btn-xs">
          <span className="glyphicon glyphicon-edit" title="Edit" />
        </button>
      </td>
    </tr>
  );
}
