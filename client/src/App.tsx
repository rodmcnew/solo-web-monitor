import React from 'react';
import './App.css';
import { MonitorDashboardContainer } from './features/monitor/MonitorDashboardContainer';
function App() {
  return (
    <div className="App">
      <header>
        <span className="logoText">Solo Web Monitor</span>
        <span style={{ float: 'right' }}>
          <a className="center" href="/demo/reset-data">Reset Demo Data</a>
          &nbsp;|&nbsp;
          <a className="center" href="https://github.com/rodmcnew/solo-web-monitor">Documents</a>
        </span>
      </header>
      <MonitorDashboardContainer />
    </div>
  );
}

export default App;
