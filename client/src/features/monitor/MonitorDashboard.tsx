import React from 'react';
import {MonitorListContainer} from '../monitor-list/MonitorListContainer';
import {MonitorDetailsContainer} from './MonitorDetailsContainer';
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
