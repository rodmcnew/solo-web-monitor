import React from 'react';
import { Monitor } from '../../types';
import { MonitorBasicDetails } from '../monitor-details/MonitorBasicDetails';
import { SelectedMonitorEventsDisplay } from '../monitor-events/SelectedMonitorEventsDisplay';

interface Props {
    monitor: Monitor
}

export function ViewMonitorDetailsPage({ monitor }: Props) {
    return (
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">Selected Monitor</h3>
            </div>
            <div className="card-body">
                <MonitorBasicDetails monitor={monitor} />
                <SelectedMonitorEventsDisplay />
            </div>
        </div>
    )
}
