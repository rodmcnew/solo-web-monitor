import React from 'react';
import './App.css';
import AppHeader from './AppHeader';
import { MonitorDashboardContainer } from './features/monitor/MonitorDashboardContainer';
function App() {
  return (
    <div className="App">
      <AppHeader />
      <MonitorDashboardContainer />
    </div>
  );
}

export default App;
