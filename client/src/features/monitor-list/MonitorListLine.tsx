import { CheckIcon, FlameIcon, PencilIcon, QuestionIcon, TrashIcon } from '@primer/octicons-react';
import React, { useCallback } from 'react';
import { Monitor } from '../../types';
import { MonitorStatus } from '../../types/MonitorStatus';
import { getMonitorStatusLabel } from '../monitor/monitorStatusDescriptions';

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
      className={monitor.id === selectedMonitorId ? 'table-active' : ''}
    >
      <td>
        {monitor.status === MonitorStatus.Up &&
          <span title={statusTooltipText} ><CheckIcon className="text-success" /></span>
        }
        {monitor.status === MonitorStatus.Down &&
          <span title={statusTooltipText} ><FlameIcon className="text-danger" /></span>
        }
        {monitor.status === MonitorStatus.Starting &&
          <span title={statusTooltipText} ><QuestionIcon className="text-info" /></span>
        }
        &nbsp;&nbsp;
        <span>{monitor.name}</span>
        <button onClick={handleDeleteMonitorClick} title="Delete Monitor"
          className="btn btn-secondary btn-xs float-right">
          <TrashIcon />
        </button>
        <span className="float-right">&nbsp;</span>
        <button onClick={handleEditMonitorClick} title="Edit Monitor"
          className="btn btn-secondary btn-xs float-right">
          <PencilIcon />
        </button>
      </td>
    </tr>
  );
}
