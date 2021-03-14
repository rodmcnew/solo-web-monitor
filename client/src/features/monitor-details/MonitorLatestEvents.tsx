import React, {useMemo} from 'react';
import {MonitorEvent} from '../../types';
import {monitorStatusDescriptions} from '../monitor/monitorStatusDescriptions';

interface Props {
  monitorEvents: MonitorEvent[]
}

export function MonitorLatestEvents({monitorEvents}: Props) {

  //@TODO does this useMemo make sense?
  //@TODO should this logic be somewhere else?
  const statusChangedEvents = useMemo(
    () => monitorEvents.filter(monitorEvent => monitorEvent.statusChanged),
    [monitorEvents]
  )

  return (
    <table className="table">
      <tbody>
        <tr>
          <th>Status</th>
          <th>Date</th>
          <th>Reason</th>
          {/*<!--<th>Duration</th>-->*/}
        </tr>
        {statusChangedEvents.map((event) =>
          <tr key={event.id}>
            <td>
              {monitorStatusDescriptions[event.status]}
              {/* {this.getEventTypeDescription(event.type)} */}
            </td>
            <td>{event.date}</td>
            <td>{event.reason}</td>
            {/*<td><strike>Unknown</strike></td>*/}
          </tr>
        )}
      </tbody>
    </table>
  )
}


