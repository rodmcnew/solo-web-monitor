import React from 'react';
import {Monitor} from './MonitorType';
export function MonitorDetailsDisplay({monitor}: {monitor: Monitor}) {
    const getStatusDescription = (monitor: Monitor) => {
        if (monitor.up === true) {
            return 'Up';
        } else if (monitor.up === false) {
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
                Monitoring Interval: Every {monitor.interval} Minutes
            </div>
            <br />
            <h4 style={{display: 'inline'}}>Response Time</h4> (ms)
            {/* <MonitorPingChart pings={this.props.pings} /> */}
            <h4>Latest Events</h4>
            {/* <MonitorEventsDisplay events={this.props.events} /> */}
        </div>
    )
}

