import React, { useCallback } from 'react';
export function ResetDemoDataLink() {

    const handleResetClick = useCallback(() => {
        if (window.confirm('Reset all the data in the database to the initial demo values?')) {
            window.location.href = '/demo/reset-data';
        }
    }, [])

    return <button className="btn btn-link" onClick={handleResetClick}>Reset datebase to demo data</button>;
}