import React from 'react';
import './App.css';
import {MonitorDashboardContainer} from './features/monitor/MonitorDashboardContainer';
function App() {
  return (
    <div className="App">
      <header>
        <span className="logoText">Solo Web Monitor</span>
        <a style={{float: 'right'}} className="center" href="https://github.com/rodmcnew/solo-web-monitor">Documents</a>
      </header>
      <MonitorDashboardContainer />
    </div>
  );
}

export default App;
