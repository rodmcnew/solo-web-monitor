import React from 'react';
import {MonitorDetailsContainer} from '../monitor-details/MonitorDetailsContainer';
import {MonitorListContainer} from '../monitor-list/MonitorListContainer';

export function MonitorDashboard() {
  return <div>
    <div className="row">
      <div className="col-sm-4">
        <MonitorListContainer />
      </div>
      <div className="col-sm-8">
        <MonitorDetailsContainer />
      </div>
    </div>
  </div>
}
