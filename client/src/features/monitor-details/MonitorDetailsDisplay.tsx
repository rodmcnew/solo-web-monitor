import React from 'react';
import { Monitor, MonitorEvent } from '../../types';
import { MonitorLatestEvents } from '../monitor-events/MonitorLatestEvents';
import { MonitorPingChart } from '../monitor-events/MonitorPingChart';
import { MonitorBasicDetails } from './MonitorBasicDetails';

interface Props {
    monitor: Monitor;
    monitorEvents: MonitorEvent[];
}
export function MonitorDetailsDisplay({ monitor, monitorEvents }: Props) {
    return (
        <div>
            <MonitorBasicDetails monitor={monitor} />
            <div className="mt-3">
                <h4 className="d-inline">Response Time</h4> (ms)
            </div>
            <MonitorPingChart monitorEvents={monitorEvents} />
            <h4 className="mt-3">Latest Events</h4>
            <MonitorLatestEvents monitorEvents={monitorEvents} maxEventCount={10} />
        </div>
    )
}

