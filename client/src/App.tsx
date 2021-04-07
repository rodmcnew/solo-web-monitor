import React from 'react';
import './App.css';
import { AppHeader } from './AppHeader';
import { MonitorDashboardContainer } from './features/monitor/MonitorDashboardContainer';
export function App() {
  return (
    <div className="App">
      <AppHeader />
      <MonitorDashboardContainer />
    </div>
  );
}