import React, { useMemo } from 'react';
import { MonitorEvent } from '../../types';
import { monitorStatusDescriptions } from '../monitor/monitorStatusDescriptions';

interface Props {
  monitorEvents: MonitorEvent[];
  maxEventCount: number;
}

export function MonitorLatestEvents({ monitorEvents, maxEventCount }: Props) {

  //@TODO does this useMemo make sense?
  //@TODO should this logic be somewhere else?
  const statusChangedEvents = useMemo(
    () => monitorEvents.filter(monitorEvent => monitorEvent.statusChanged).slice(0, maxEventCount),
    [monitorEvents]
  )

  return (
    <table className="table">
      <tbody>
        <tr>
          <th>Status</th>
          <th>Date</th>
          <th>Reason</th>
        </tr>
        {statusChangedEvents.map((event) =>
          <tr key={event.id}>
            <td>
              {monitorStatusDescriptions[event.status]}
            </td>
            <td>{event.date}</td>
            <td>{event.reason}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}


