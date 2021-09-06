import { Monitor } from "../../../types";
import { getMonitorIntervalLabel } from "../monitor/monitorIntervals";
import { getMonitorStatusLabel } from "../monitor/monitorStatusDescriptions";
import React from 'react';

interface Props {
    monitor: Monitor;
}
export function MonitorBasicDetails({ monitor }: Props) {
    return <div>
        <div>
            Name: {monitor.name}
        </div>
        <div>
            URL: {monitor.url}
        </div>
        <div>
            Status: {getMonitorStatusLabel(monitor.status)}
        </div>
        <div>
            Monitoring Interval: {getMonitorIntervalLabel(monitor.interval)}
        </div>
    </div>
}
