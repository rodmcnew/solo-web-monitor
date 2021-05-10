import React from 'react';
import { IconContext } from 'react-icons/lib';
import { AppHeader } from './AppHeader';
import { MonitorDashboardContainer } from './features/dashboard/MonitorDashboardContainer';
export function App() {
  return (
    <div className="App container">
      <IconContext.Provider value={{ className: 'react-icon-align' }}>
        <AppHeader />
        <MonitorDashboardContainer />
      </IconContext.Provider>
    </div>
  );
}