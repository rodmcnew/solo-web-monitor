import React from 'react';
import { IconContext } from 'react-icons/lib';
import { AppHeader } from './AppHeader';
import { MonitorDashboard } from './features/dashboard/MonitorDashboard';
export function App() {
  return (
    <div className="App container">
      <IconContext.Provider value={{ className: 'react-icon-align' }}>
        <AppHeader />
        <MonitorDashboard />
      </IconContext.Provider>
    </div>
  );
}