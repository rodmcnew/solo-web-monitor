import React, { useCallback } from 'react';
import { demoApi } from './demoApi';

export function ResetDemoDataLink() {
    const handleResetClick = useCallback(() => {
        if (window.confirm('Reset all the data in the database to the initial demo values?\n\nThis is safe to do since you are in the demo.')) {
            demoApi.resetDatabase().then(() => {
                window.location.reload();
            })
        }
    }, [])

    return <button className="btn btn-link" onClick={handleResetClick}>Reset database to demo data</button>;
}