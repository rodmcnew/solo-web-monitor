import React from 'react';
import './App.css';
import { MonitorDashboardContainer } from './features/monitor/MonitorDashboardContainer';
function App() {
  //@TODO only show demo reset button if in demo mode per ENV?
  return (
    <div className="App">
      <header>
        <span className="logoText">Solo Web Monitor</span>
        <span style={{ float: 'right' }}>
          <a className="center"
            title="Resets all the data in the database to the initial demo values."
            href="/demo/reset-data">Reset Demo</a>
          &nbsp;|&nbsp;
          <a className="center"
            title="View the docs on Github."
            href="https://github.com/rodmcnew/solo-web-monitor">Documents</a>
        </span>
      </header>
      <MonitorDashboardContainer />
    </div>
  );
}

export default App;
