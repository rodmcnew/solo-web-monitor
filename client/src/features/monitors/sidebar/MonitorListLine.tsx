import React, { useCallback } from 'react';
import { Monitor } from '../../../types';
import { MonitorStatus } from '../../../types/MonitorStatus';
import { getMonitorStatusLabel } from '../monitor/monitorStatusDescriptions';
import { FaCheck, FaExclamation, FaPen, FaQuestion, FaTrash } from "react-icons/fa";
import './MonitorListLine.css';
interface Props {
  monitor: Monitor;
  onDeleteMonitor: (monitorId: string) => void;
  onSelectMonitor: (monitorId: string) => void;
  onEditMonitor: (monitorId: string) => void;
  selectedMonitorId: string | null;
}

export function MonitorListLine({
  monitor, onDeleteMonitor, onEditMonitor, onSelectMonitor, selectedMonitorId
}: Props) {

  const handleDeleteMonitorClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onDeleteMonitor(monitor.id);
  }, [onDeleteMonitor, monitor.id]);

  const handleSelectMonitorClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onSelectMonitor(monitor.id)
  }, [onSelectMonitor, monitor.id]);

  const handleEditMonitorClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onEditMonitor(monitor.id)
  }, [onEditMonitor, monitor.id]);

  const statusTooltipText = 'Status: ' + getMonitorStatusLabel(monitor.status);

  return (
    <tr
      role="button"
      onClick={handleSelectMonitorClick}
      className={monitor.id === selectedMonitorId ? 'MonitorListLine table-active' : 'MonitorListLine'}
    >
      <td>
        <div className="MonitorListLine-label">
          {monitor.status === MonitorStatus.Up &&
            <FaCheck title={statusTooltipText} className="text-success" />
          }
          {monitor.status === MonitorStatus.Down &&
            <FaExclamation title={statusTooltipText} className="text-danger" />
          }
          {monitor.status === MonitorStatus.Starting &&
            <FaQuestion title={statusTooltipText} className="text-info" />
          }
          &nbsp;&nbsp;
          <span>{monitor.name}</span>
        </div>
        <div className="MonitorListLine-buttons">
          <button onClick={handleDeleteMonitorClick} title="Delete Monitor"
            className="btn btn-secondary btn-xs float-right">
            <FaTrash />
          </button>
          <span className="float-right">&nbsp;</span>
          <button onClick={handleEditMonitorClick} title="Edit Monitor"
            className="btn btn-secondary btn-xs float-right">
            <FaPen />
          </button>
        </div>
      </td>
    </tr>
  );
}
