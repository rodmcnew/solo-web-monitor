import React from 'react';
import {Monitor, MonitorEvent} from '../../types';
import {MonitorStatus} from '../../types/MonitorStatus';
import {MonitorLatestEvents} from './MonitorLatestEvents';
import {MonitorPingChart} from './MonitorPingChart';

interface Props {
    monitor: Monitor,
    monitorEvents: MonitorEvent[]
}
export function MonitorDetailsDisplay({monitor, monitorEvents}: Props) {
    const getStatusDescription = (monitor: Monitor) => {
        if (monitor.status === MonitorStatus.Up) {
            return 'Up';
        } else if (monitor.status === MonitorStatus.Down) {
            return 'Down';
        } else {
            return 'Starting';
        }
    }

    return (
        <div>
            <div>
                Name: {monitor.name}
            </div>
            <div>
                URL: {monitor.url}
            </div>
            <div>
                Status: {getStatusDescription(monitor)}
            </div>
            <div>
                Monitoring Interval: Every {monitor.interval} Minute(s)
            </div>
            <br />
            <h4 style={{display: 'inline'}}>Response Time</h4> (ms)
            <MonitorPingChart monitorEvents={monitorEvents} />
            <h4>Latest Events</h4>
            <MonitorLatestEvents monitorEvents={monitorEvents} />
        </div>
    )
}

