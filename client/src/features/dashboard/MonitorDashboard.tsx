import React from 'react';
import { MonitorDetailsContainer } from '../monitor-details/MonitorDetailsContainer';
import { MonitorListContainer } from '../monitor-list/MonitorListContainer';

export function MonitorDashboard() {
  return <div>
    <div className="row">
      <div className="col-lg-12 col-xl-4">
        <MonitorListContainer />
      </div>
      <div className="col-lg-12 col-xl-8">
        <MonitorDetailsContainer />
      </div>
    </div>
  </div>
}
