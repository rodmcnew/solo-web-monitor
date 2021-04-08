
import React from 'react';
import './PanelBodyNetworkError.css';

export function PanelBodyNetworkError() {
    return <div className="PanelBodyNetworkError alert alert-warning" role="alert">
        An error occurred while communicating with the server.
        Please check your network connection and try again.
    </div>
}