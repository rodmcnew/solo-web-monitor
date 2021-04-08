
import { default as BootstrapSpinner } from 'react-bootstrap/Spinner'
import React from 'react';
import './PanelBodySpinner.css';

export function PanelBodySpinner() {
    return <div className="PanelBodySpinner">
        <BootstrapSpinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </BootstrapSpinner>
    </div>
}