import React, { useCallback } from 'react';
import { DEMO_DATA_RESET_URL } from '../../config';

//@TODO change from redirct to http post
export function ResetDemoDataLink() {

    const handleResetClick = useCallback(() => {
        if (window.confirm('Reset all the data in the database to the initial demo values?')) {
            window.location.href = DEMO_DATA_RESET_URL;
        }
    }, [])

    return <button className="btn btn-link" onClick={handleResetClick}>Reset datebase to demo data</button>;
}