import React from 'react';
import { Monitor, MonitorEvent } from '../../types';
import { MonitorLatestEvents } from '../monitor-events/MonitorLatestEvents';
import { MonitorPingChart } from '../monitor-events/MonitorPingChart';
import { MonitorBasicDetails } from './MonitorBasicDetails';

interface Props {
    monitor: Monitor,
    monitorEvents: MonitorEvent[]
}
export function MonitorDetailsDisplay({ monitor, monitorEvents }: Props) {
    return (
        <div>
            <MonitorBasicDetails monitor={monitor} />
            <br />
            <h4 style={{ display: 'inline' }}>Response Time</h4> (ms)
            <MonitorPingChart monitorEvents={monitorEvents} />
            <h4>Latest Events</h4>
            <MonitorLatestEvents monitorEvents={monitorEvents} />
        </div>
    )
}

