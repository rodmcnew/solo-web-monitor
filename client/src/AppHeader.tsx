import React from 'react';
import { ResetDemoDataLink } from './features/demo/ResetDemoDataLink';
export function AppHeader() {
    return (
        <header>
            <a className="logoText" href="/">Solo Web Monitor</a>
            <span className="float-md-right">
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