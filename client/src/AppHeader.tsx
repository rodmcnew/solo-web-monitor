import React from 'react';
import './App.css';
import { ResetDemoDataLink } from './features/demo/ResetDemoDataLink';
export function AppHeader() {
    //@TODO only show demo reset button if in demo mode per ENV?
    return (
        <header>
            <a className="logoText" href="/">Solo Web Monitor</a>
            <span className="float-right">
                <ResetDemoDataLink />
                &nbsp;|&nbsp;
                <a title="View the docs on Github."
                    className="btn btn-link"
                    href="https://github.com/rodmcnew/solo-web-monitor">Documents
                </a>
            </span>
        </header>
    );
}