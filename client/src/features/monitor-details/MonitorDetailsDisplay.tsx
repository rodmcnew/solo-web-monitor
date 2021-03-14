import React, { useMemo } from 'react';
import { Monitor, MonitorEvent } from '../../types';
import { MonitorStatus } from '../../types/MonitorStatus';
import { getMonitorIntervalLabel } from '../monitor/monitorIntervals';
import { getMonitorStatusLabel, monitorStatusDescriptions } from '../monitor/monitorStatusDescriptions';
import { MonitorBasicDetails } from './MonitorBasicDetails';
import { MonitorLatestEvents } from './MonitorLatestEvents';
import { MonitorPingChart } from './MonitorPingChart';

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

