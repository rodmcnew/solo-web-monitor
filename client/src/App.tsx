import React from 'react';
import { IconContext } from 'react-icons/lib';
import { AppHeader } from './AppHeader';
import { Monitors } from './features/monitors/Monitors';
export function App() {
  return (
    <div className="App container">
      <IconContext.Provider value={{ className: 'react-icon-align' }}>
        <AppHeader />
        <Monitors />
      </IconContext.Provider>
    </div>
  );
}