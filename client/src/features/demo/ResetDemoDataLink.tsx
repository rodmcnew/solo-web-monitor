import React, { useCallback } from 'react';
import { demoApi } from './demoApi';
//@TODO change from redirct to http post
export function ResetDemoDataLink() {

    const handleResetClick = useCallback(() => {
        if (window.confirm('Reset all the data in the database to the initial demo values?')) {
            demoApi.resetDatabase().then(() => {
                window.location.reload();
            })
        }
    }, [])

    return <button className="btn btn-link" onClick={handleResetClick}>Reset datebase to demo data</button>;
}