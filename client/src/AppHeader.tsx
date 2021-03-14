import React from 'react';
import './App.css';
import { ResetDemoDataLink } from './features/demo/ResetDemoDataLink';
function AppHeader() {
    //@TODO only show demo reset button if in demo mode per ENV?
    return (
        <header>
            <span className="logoText">Solo Web Monitor</span>
            <span style={{ float: 'right' }}>
                <ResetDemoDataLink />
          &nbsp;|&nbsp;
          <a title="View the docs on Github."
                    href="https://github.com/rodmcnew/solo-web-monitor">Documents</a>
            </span>
        </header>
    );
}

export default AppHeader;
