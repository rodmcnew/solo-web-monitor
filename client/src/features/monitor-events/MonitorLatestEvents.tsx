import React, { useMemo } from 'react';
import { MonitorEvent } from '../../types';
import { monitorStatusDescriptions } from '../monitor/monitorStatusDescriptions';

interface Props {
  monitorEvents: MonitorEvent[];
  maxEventCount: number;
}

export function MonitorLatestEvents({ monitorEvents, maxEventCount }: Props) {

  const statusChangedEvents = useMemo(
    () => monitorEvents.filter(monitorEvent => monitorEvent.statusChanged).slice(0, maxEventCount),
    [monitorEvents, maxEventCount]
  )

  return (
    <table className="table">
      <tbody>
        <tr>
          <th>Status</th>
          <th>Date</th>
          <th className="d-none d-md-table-cell">Reason</th>
        </tr>
        {statusChangedEvents.map((event) =>
          <tr key={event.id}>
            <td>
              {monitorStatusDescriptions[event.status]}
            </td>
            <td>{event.date}</td>
            <td className="d-none d-md-table-cell">{event.reason}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}


